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
import Stopwatch from "./Stopwatch";


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
    
    function between(x, min, max) {
        return x >= min && x <= max;
    }

    const checkCharacters = (e) => {

        setTargetBox(prevTargetBox => !prevTargetBox);

        setTargetBoxPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

        console.log(`X: ${e.nativeEvent.offsetX}`)
        console.log(`Y: ${e.nativeEvent.offsetY}`)

    }

    const selectCharacter = (e) => {

        const characterName = e.target.textContent;
        console.log(characterData);

        for (const el in characterData) {
            if (characterData[el].characterName === characterName) {
                if (between(targetBoxPosition.x, characterData[el].x1, characterData[el].x2) && between(targetBoxPosition.y, characterData[el].y1, characterData[el].y2)) {
                    console.log(`${characterName} is found!`)
                    const characterToUpdate = `characters.${el}.found`;
                    setCorrectGuess(prevCorrectGuess => {
                        return (
                        [
                            ...prevCorrectGuess,
                            {x: targetBoxPosition.x, y: targetBoxPosition.y, character: characterName}
                            ]
                        )
                    })
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

    useEffect(() => {
        let found = [];
        let update = [];
            for (const item in characterData) {
                found.push(characterData[item].found);
                update.push(item)
            }
        if (found.length > 0 && found.every(element => element === true)) {
            console.log('all found')

            setCorrectGuess([]);

            updateDoc(divineComedyRef, {
                    'characters.BruceLee.found': false,
                    'characters.AlbertEinstein.found': false,
                    'characters.MarilynMonroe.found': false,
                    'characters.MarieCurie.found': false,
                    'characters.WilliamShakespeare.found': false,
                    'stopwatchReset': true,
            })
        }
    }, [divineComedyData])



    let items = [];
    for (const item in divineComedyData) {
        if (item === 'characters') {
                items.push(divineComedyData[item])
            }
    }
    let characterData = items[0];

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
            <div className="correct-guess-box" style={correctGuessStyle} key={nanoid()}></div>
        )
    })

    return (
        <div className="divine-comedy">
            <header>
                <div>
                    <h1>FIND A CHARACTER</h1>
                </div>
                <div className="left-to-find">
                    <h1>Left to find:</h1>
                    {leftToFind}
                </div>
                <div>
                    Time spent:
                    <Stopwatch />
                </div>
            </header>
            {displayCorrectGuess}
            {
                targetBox &&
                <div className="target-box" style={targetBoxStyle} onClick={() => setTargetBox(prevTargetBox => !prevTargetBox)}>                        
                        <div className='select-character-box'>
                            {displayNames}
                        </div>
                </div>
            }
            <div className="gameboard-image-container" onClick={checkCharacters}>
                <img src={divineComedyData.src} id={divineComedyData.displayId} alt='' />
            </div>
        </div>
    )
}

export default DivineComedy;