import React, {useState, useEffect} from "react";
import { app, database } from '../firebaseConfig'
import {
    collection,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    onSnapshot,
} from 'firebase/firestore'
import { nanoid } from 'nanoid'
import Timer from "./Timer";

const DivineComedy = () => {

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

    const [targetBox, setTargetBox] = useState(false);

    const [targetBoxPosition, setTargetBoxPosition] = useState({ x: 0, y: 0 });

    const [correctGuess, setCorrectGuess] = useState([]);
    

    const checkCharacters = (e) => {

        setTargetBox(prevTargetBox => !prevTargetBox);

        setTargetBoxPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    let items = [];
    for (const item in divineComedyData) {
        if (item === 'characters') {
                items.push(divineComedyData[item])
            }
    }
    let characterData = items[0];

    function between(x, min, max) {
        return x >= min && x <= max;
    }

    const selectCharacter = (e) => {

        const characterName = e.target.textContent;

        for (const person in characterData) {
            if (characterData[person].characterName === characterName) {
                if (
                    between(
                        targetBoxPosition.x,
                        characterData[person].x1,
                        characterData[person].x2
                    ) &&
                    between(
                        targetBoxPosition.y,
                        characterData[person].y1,
                        characterData[person].y2
                    )) {
                    console.log(`${characterName} is found!`)
                    setCorrectGuess(prevCorrectGuess => {
                        return (
                        [
                            ...prevCorrectGuess,
                            {x: targetBoxPosition.x, y: targetBoxPosition.y, character: characterName}
                            ]
                        )
                    })
                    const characterToUpdate = `characters.${person}.found`;
                    updateDoc(divineComedyRef, {
                        [characterToUpdate]: true
                    })
                }
            }
        }

    }

    useEffect(() => {
        onSnapshot(doc(database, 'paintings', 'C6Zh8R0Fk1pfuqq2z9jg'), (doc) => {
            setDivineComedyData(doc.data())
        })
    }, [])

    const [score, setScore] = useState(0);

    useEffect(() => {
        let found = [];
        let update = [];
            for (const item in characterData) {
                found.push(characterData[item].found);
                update.push(item)
            }
        
        if (found.length > 0 && found.every(element => element === true)) {

            setScore(time);

            console.log('all found')

            setCorrectGuess([]);

            handleResetTime();

            togglePlayAgainPopup();

            updateDoc(divineComedyRef, {
                    'characters.BruceLee.found': false,
                    'characters.AlbertEinstein.found': false,
                    'characters.MarilynMonroe.found': false,
                    'characters.MarieCurie.found': false,
                    'characters.WilliamShakespeare.found': false,
            })
        }
    }, [divineComedyData])

    let characterNames = []
    for (const item in characterData) {
        if (!characterData[item].found) {
            characterNames.push(characterData[item].characterName)
        }
    }

    const displayNames = characterNames.map(element => {
            return (
                <div className="character-name" onClick={selectCharacter} key={nanoid()} >
                    <h1>{element}</h1>
                </div>
            )
    })
    
    const leftToFind = characterNames.map(element => {
            return (
                <div className="characters-left-to-find" key={nanoid()} >
                    <h1>{element}</h1>
                </div>
            )
    })

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
            border: '2px solid #FFD700',
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

    const handlePauseResumeTime = () => {
	    setTimeIsPaused(!timeIsPaused);
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

    const [username, setUsername] = useState('');

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
            {playAgainPopup && (
                <div className="play-again-popup">
                    <div className="overlay"></div>
                    <div className="play-again-popup-content">
                        <h1>YOUR SCORE</h1>
                        <h2>{("0" + Math.floor(( score  / 60000) % 60)).slice(-2)}:
                            {("0" + Math.floor(( score / 1000) % 60)).slice(-2)}
                        </h2>
                        <button onClick={handlePlayAgain}>PLAY AGAIN</button>
                    </div>
                </div>
            )}
            {startPopup && (
                <div className="start-popup">
                    <div className="overlay"></div>
                    <div className="start-popup-content">
                        <label htmlFor='enter-your-name'>ENTER YOUR NAME</label>
                        <input type='text' placeholder="Your name" id='enter-your-name' onChange={handleUsername}></input>
                        <h1>YOUR TASK IS TO FIND:</h1>
                        {leftToFind}
                        <button onClick={handleStartGame}>START GAME</button>
                    </div>
                </div>
            )}
            <header>
                <div>
                    <h1>FIND A CHARACTER</h1>
                    <h2>{username}</h2>
                </div>
                <div className="left-to-find">
                    <h1>Left to find:</h1>
                    {leftToFind}
                </div>
                <div>
                    Time:
                    	<div className="stop-watch">
	                        <Timer time={time} />
	                    </div>
                </div>
            </header>
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