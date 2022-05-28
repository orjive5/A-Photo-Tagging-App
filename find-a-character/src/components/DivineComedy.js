import React, { useState, useEffect } from "react";
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

const DivineComedy = () => {

    //GET THE DATA FROM FIRESTORE AND SET THE DATA STATE

    const [divineComedyData, setDivineComedyData] = useState({});
    const divineComedyRef = doc(database, 'paintings', 'C6Zh8R0Fk1pfuqq2z9jg');

    useEffect(() => {
        const getDivineComedy = async () => {
        const divineComedySnap = await getDoc(divineComedyRef);

            if (divineComedySnap.exists()) {
                setDivineComedyData(divineComedySnap.data())
            } else {
                console.log("No such document!");
            }
        }

        getDivineComedy();
        
    }, [])

    //RESET DATA VALUES WHEN THE PAGE IS RELOADED

    window.onload = () => {
        updateDoc(divineComedyRef, {
            'characters.BruceLee.found': false,
            'characters.AlbertEinstein.found': false,
            'characters.MarilynMonroe.found': false,
            'characters.MarieCurie.found': false,
            'characters.WilliamShakespeare.found': false,
        })
    }

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

    //HELPER VARIABLE - CHARACTER DATA - FOR CLEANER CODE

    let characterData = divineComedyData.characters;

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
                                { x: targetBoxPosition.x, y: targetBoxPosition.y, character: characterName }
                            ]
                        )
                    });

                    const characterToUpdate = `characters.${person}.found`;

                    updateDoc(divineComedyRef, {
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
        onSnapshot(doc(database, 'paintings', 'C6Zh8R0Fk1pfuqq2z9jg'), (doc) => {
            setDivineComedyData(doc.data())
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

            updateDoc(divineComedyRef, update);

        }
    }, [divineComedyData])

    //HELPER VARIABLES - TOP SCORES - FOR CLEANER CODE

    let topScoresData = divineComedyData.topScores;
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

            updateDoc(divineComedyRef, updateTopScores)

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
                username={username}
                leftToFind={leftToFind}
                time={time}
            />
            {displayCorrectGuess}
            {
                targetBox &&
                <div
                    className="target-box"
                    style={targetBoxStyle}
                    onClick={() => setTargetBox(prevTargetBox => !prevTargetBox)}
                >                        
                        <div className='select-character-box'>
                            {displayNames}
                        </div>
                </div>
            }
            <div className="gameboard-image-container" onClick={checkCharacters}>
                <img
                    src={divineComedyData.src}
                    id={divineComedyData.displayId} alt=''
                />
            </div>
        </div>
    )
}

export default DivineComedy;