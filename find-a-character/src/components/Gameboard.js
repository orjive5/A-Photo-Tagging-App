import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { database } from '../firebaseConfig'
import {
    getDoc,
    doc,
    updateDoc,
    onSnapshot,
} from 'firebase/firestore'
import { nanoid } from 'nanoid'
import StartPopup from "./StartPopup";
import PlayAgainPopup from "./PlayAgainPopup";
import Header from "./Header";

const Gameboard = ({history}) => {

    //GET THE PAINTING ID THROUGH THE ROUTER - useLocation()
    const location = useLocation();
    const paintingId = location.state.paintingId;

    //GET THE DATA FROM FIRESTORE AND SET THE DATA STATE

    const [paintingData, setPaintingData] = useState({});
    const paintingRef = doc(database, 'paintings', paintingId);

    useEffect(() => {
        const getPainting = async () => {
            const paintingSnap = await getDoc(paintingRef);

            if (paintingSnap.exists()) {
                setPaintingData(paintingSnap.data());
            } else {
                console.log("No such document!");
            }
        }

        getPainting();
        
    }, [])

    //RESET DATA WHEN THE PAGE IS RELOADED

    let characterData = paintingData.characters;

    window.addEventListener('beforeunload', () => {

        let update = {};

        for (const item in characterData) {
            let updateKey = `characters.${item}.found`
            update[updateKey] = false;
        }

        updateDoc(paintingRef, update)

    });

    //INITIALIZE AND SET: TARGET BOX, CORRECT GUESS AND ERROR FEEDBACK STATES

    const [targetBox, setTargetBox] = useState(false);

    const [targetBoxPosition, setTargetBoxPosition] = useState({ x: 0, y: 0 });

    const [correctGuess, setCorrectGuess] = useState([]);

    const [errorFeedback, setErrorFeedback] = useState(false);
    
    //TOGGLE THE TARGET BOX TO TRY AND GUESS A CHARACTER

    const checkCharacters = (e) => {

        setTargetBox(prevTargetBox => !prevTargetBox);

        setTargetBoxPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    //HELPER FUNCTION TO CHECK IF NUMBER IS IN SPECIFIC RANGE

    const between = (x, min, max) => x >= min && x <= max;

    //AFTER TARGET BOX IS OPENED, SELECT A CHARACTER TO TRY AND GUESS IT

    const selectCharacter = (e) => {

        const characterName = e.target.textContent;

        for (const person in characterData) {

            if (characterData[person].characterName === characterName) {
                
                if (between(
                        targetBoxPosition.x,
                        characterData[person].x1,
                        characterData[person].x2
                    ) &&
                    between(
                        targetBoxPosition.y,
                        characterData[person].y1,
                        characterData[person].y2
                    )) {
                    
                    setCorrectGuess(prevCorrectGuess => {
                        return (
                            [
                                ...prevCorrectGuess,
                                {
                                    x: targetBoxPosition.x,
                                    y: targetBoxPosition.y,
                                    character: characterName
                                }
                            ]
                        )
                    });

                    const characterToUpdate = `characters.${person}.found`;

                    updateDoc(paintingRef, {
                        [characterToUpdate]: true
                    })

                } else {
                    setErrorFeedback(true);
                    setTimeout(() => setErrorFeedback(false), 3000)
                }
            }
        }

    }

    //USE onSnapshot TO MAKE CHANGES IN REAL TIME

    useEffect(() => {
        onSnapshot(doc(database, 'paintings', paintingId), (doc) => {
            setPaintingData(doc.data())
        })
    }, [])

    //INITIALIZE SCORE STATE

    const [score, setScore] = useState(0);

    //CHECK IF EVERY CHARACTER IS FOUND AND RESET THE DATA IF TRUE

    useEffect(() => {

        let found = [];
        let update = {};

        for (const item in characterData) {
            found.push(characterData[item].found);
            let updateKey = `characters.${item}.found`
            update[updateKey] = false;
        }
        
        if (found.length > 0 && found.every(element => element === true)) {

            setScore(time);

            setCorrectGuess([]);

            handleResetTime();

            togglePlayAgainPopup();

            updateDoc(paintingRef, update);

        }
    }, [paintingData])

    //HELPER VARIABLES - TOP SCORES - FOR CLEANER CODE

    let topScoresData = paintingData.topScores;
    let topTenScores = [];
    for (const item in topScoresData) {
        topTenScores.push(topScoresData[item])
    }

    //CHECK IF A PLAYER HAS A TOP SCORE AND UPDATE THE DATA IF TRUE

    useEffect(() => {

        let indexToChange;

        if (topTenScores.some(element => element.score >= score)) {

            for (const item of topTenScores) {
                if (score !== 0 && score <= item.score) {
                    indexToChange = topTenScores.indexOf(item);
                    topTenScores.splice(
                        indexToChange,
                        0,
                        { score: score, user: username }
                    );
                    topTenScores.pop();
                    break;
                }
            }

            let updateTopScores = {};

            for (let i = 0; i < 10; i++){
                let topScoresKey = `topScores.${i+1}`
                updateTopScores[topScoresKey] = topTenScores[i]
            }

            updateDoc(paintingRef, updateTopScores)

        }
    }, [score])

    //LOOP THROUGH TOP SCORES AND DISPLAY THEM, BUT CONVERT MILLISECONDS TO SECONDS

    const displayTopScores = topTenScores.map((element, index) => {

        return (
            <div className="top-score">
                <h1>
                    {index + 1}. {element.user}: {("0" + Math.floor(( element.score / 60000) % 60)).slice(-2)}:
                    {("0" + Math.floor(( element.score / 1000) % 60)).slice(-2)}
                </h1>
            </div>
        )

    })

    //HELPER VARIABLES - CHARACTER NAMES - FOR CLEANER CODE

    let characterNames = []
    for (const item in characterData) {
        if (!characterData[item].found) {
            characterNames.push(characterData[item].characterName)
        }
    }

    //LOOP THROUGH CHARACTER NAMES TO DISPLAY THEM

    const displayNames = characterNames.map(element => {
        return (
            <div className="character-name" onClick={selectCharacter} key={nanoid()} >
                <h1>{element}</h1>
            </div>
        )
    })

    //LOOP THROUGH CHARACTER NAMES TO DISPLAY CHARACTERS WHICH ARE LEFT TO FIND
    
    const leftToFind = characterNames.map(element => {
        return (
            <div className="characters-left-to-find" key={nanoid()} >
                <h1>{element}</h1>
            </div>
        )
    });

    //ADD TARGET BOX AND CORRECT GUESS STYLES HERE BECAUSE OF DYNAMICALLY CHANGING VALUES

    const targetBoxStyle = {
        borderRadius: '50%',
        position: 'absolute',
        width: '100px',
        height: '100px',
        top: `${targetBoxPosition.y - 50}px`,
        left: `${targetBoxPosition.x - 50}px`,
        backdropFilter: 'brightness(130%)'
    }

    const displayCorrectGuess = correctGuess.map(element => {

        const correctGuessStyle = {
            borderRadius: '50%',
            border: '2px solid #00FF00',
            position: 'absolute',
            width: '100px',
            height: '100px',
            top: `${element.y - 50}px`,
            left: `${element.x - 50}px`,
            backdropFilter: 'brightness(130%)'
        }

        return (
            <div
                className="correct-guess-box"
                style={correctGuessStyle}
                key={nanoid()}>
            </div>
        )
    })

    //STOPWATCH

    const [timeIsActive, setTimeIsActive] = useState(false);
    const [timeIsPaused, setTimeIsPaused] = useState(true);
    const [time, setTime] = useState(0);

    useEffect(() => {
    
        let interval = null;

	    if (timeIsActive && timeIsPaused === false) {
	    interval = setInterval(() => {
		    setTime((time) => time + 1000);
	    }, 1000);
	    } else {
	    clearInterval(interval);
	    }
	    return () => {
	    clearInterval(interval);
	    };
    }, [timeIsActive, timeIsPaused]);

    const handleStartTime = () => {
	    setTimeIsActive(true);
	    setTimeIsPaused(false);
    };

    const handleResetTime = () => {
	    setTimeIsActive(false);
	    setTime(0);
    };

    //START POPUP

    const [startPopup, setStartPopup] = useState(true);

    const toggleStartPopup = () => {
        setStartPopup(!startPopup)
    }

    if (startPopup) {
        document.body.classList.add('active-start-popup')
    } else {
        document.body.classList.remove('active-start-popup')
    }

    //If StartPopup true - reset data

    if (startPopup) {
        let update = {};

        for (const item in characterData) {
            let updateKey = `characters.${item}.found`
            update[updateKey] = false;
        }

        updateDoc(paintingRef, update);

    }

    const [username, setUsername] = useState('Player');

    function handleUsername(e) {
        setUsername(e.target.value)
    }
    function handleStartGame() {
        toggleStartPopup();
        handleStartTime();
    }

    //PLAY AGAIN POPUP

    const [playAgainPopup, setPlayAgainPopup] = useState(false);

    if (playAgainPopup) {
        document.body.classList.add('active-play-again-popup')
    } else {
        document.body.classList.remove('active-play-again-popup')
    }

    const togglePlayAgainPopup = () => {
        setPlayAgainPopup(!playAgainPopup)
    }

    function handlePlayAgain() {
        togglePlayAgainPopup();
        handleStartTime();
    }

    const [selectBoxOffset, setSelectBoxOffset] = useState({top: 83, left: 83});

    useEffect(() => {
        const selectDiv = document.querySelector('.select-character-box');
        const imageFeatured = document.querySelector(`#${paintingData.displayId}`);
        if (selectDiv !== null) {
            const imageFeaturedWidth = imageFeatured.offsetWidth;
            const imageFeaturedHeight = imageFeatured.offsetHeight;
            const selectDivWidth = selectDiv.offsetWidth;
            const selectDivHeight = selectDiv.offsetHeight;
            const totalHeight = selectDivHeight + targetBoxPosition.y + 40
            const totalWidth = selectDivWidth + targetBoxPosition.x + 40
            if (totalHeight > imageFeaturedHeight && totalWidth > imageFeaturedWidth) {
                setSelectBoxOffset({top: -selectDivHeight, left: -selectDivWidth})
            } else if (totalHeight > imageFeaturedHeight) {
                setSelectBoxOffset({top: -selectDivHeight, left: 90})
            }else if (totalWidth > imageFeaturedWidth) {
                setSelectBoxOffset({top: 90, left: -selectDivWidth})
            } else {
                setSelectBoxOffset({top: 90, left: 90})
            }
        }
    }, [targetBox])
    
    const selectBoxStyle = {
        backgroundColor: 'white',
	    opacity: '0.8',
	    borderRadius: '10px',
	    position: 'absolute',
	    // top: `-163px`,
	    // left: `83px`,
	    // top: `-163px`,
	    // left: `-408px`,
	    top: `${selectBoxOffset.top}px`,
	    left: `${selectBoxOffset.left}px`,
	    overflow: 'hidden',
    }
    // setTargetBoxPosition

    return (
        <div className="divine-comedy">
            {errorFeedback && (
                <div className="error-feedback">
                    <h1>TRY AGAIN!</h1>
                </div>
            )}
            {playAgainPopup && <PlayAgainPopup
                username={username}
                score={score}
                handlePlayAgain={handlePlayAgain}
                displayTopScores={displayTopScores}
            />}
            {startPopup && <StartPopup
                handleUsername={handleUsername}
                leftToFind={leftToFind}
                handleStartGame={handleStartGame}
            />}
            <Header
                handleStartGame={handleStartGame}
                username={username}
                leftToFind={leftToFind}
                time={time}
            />
            {displayCorrectGuess}
            {
                targetBox &&
                <div
                        className="target-box-wrapper"
                        onClick={() => setTargetBox(prevTargetBox => !prevTargetBox)}
                    >
                    <div
                        className="target-box"
                        style={targetBoxStyle}
                    >
                            <div className='select-character-box' style={selectBoxStyle}>
                                {displayNames}
                            </div>
                    </div>
                </div>
            }
            <div className="gameboard-image-container" onClick={checkCharacters}>
                <img
                    src={paintingData.src}
                    id={paintingData.displayId} alt=''
                />
            </div>
        </div>
    )
}

export default Gameboard;