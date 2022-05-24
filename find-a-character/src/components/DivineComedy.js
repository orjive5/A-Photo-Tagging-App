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
    
    function between(x, min, max) {
        return x >= min && x <= max;
    }

    const checkCharacters = (e) => {

        setTargetBox(prevTargetBox => !prevTargetBox);

        setTargetBoxPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

    }

    const selectCharacter = (e) => {

        const characterName = e.target.textContent;
        console.log(characterData);

        for (const el in characterData) {
            if (characterData[el].characterName === characterName) {
                if (between(targetBoxPosition.x, characterData[el].x1, characterData[el].x2) && between(targetBoxPosition.y, characterData[el].y1, characterData[el].y2)) {
                    console.log(`${characterName} is found!`)
                    const characterToUpdate = `characters.${el}.found`;
                    console.log(characterToUpdate)
                    console.log(characterData)
                    updateDoc(divineComedyRef, {
                        [characterToUpdate]: true
                    })
                }
            }
        }
        
        const characters = divineComedyData.characters;

    }

    useEffect(() => {
        console.log(characterData)
        // const increaseAge = onSnapshot(paintingsCollectionRef, (snapshot) => {
        // setPaintings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // });

        // return () => {
        //     increaseAge();
        // }
    }, [])

    // const updateCharacter = () => {
    //     updateDoc(divineComedyRef, {
    //     'characters.BruceLee.found': true
    //     })
    //         .then(() => {
    //         alert('data updated')
    //         })
    //         .catch((err) => {
    //         alert(err.message)
    //     })
    // }


    let items = [];
    for (const item in divineComedyData) {
        if (item === 'characters') {
                items.push(divineComedyData[item])
            }
    }
    let characterData = items[0];

    let characterNames = [];
    for (const name in characterData) {
        characterNames.push(characterData[name].characterName)
    }
    
    const selectCharacterBox = characterNames.map(element => {
        return (
            <div className="character-name" onClick={selectCharacter} key={nanoid()} >
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

    return (
        <div className="divine-comedy">
            {
                targetBox &&
                <div className="target-box" style={targetBoxStyle} onClick={() => setTargetBox(prevTargetBox => !prevTargetBox)}>                        
                        <div className='select-character-box'>
                            {selectCharacterBox}
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

// import React, {useState, useEffect} from "react";
// import cardData from "./cardData";
// import { app, database } from '../firebaseConfig'
// import {
//     collection,
//     getDocs,
//     getDoc,
//     doc,
//     updateDoc,
//     deleteDoc,
// } from 'firebase/firestore'
// import { async } from "@firebase/util";


// const DivineComedy = () => {

//     const collectionRef = collection(database, 'paintings');

//     const [paintings, setPaintings] = useState([]);
//     useEffect(() => {
//         const getPaintings = async () => {
//         const data = await getDocs(collectionRef);
//         setPaintings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id() })))
//         console.log(data.docs);
//     }

//     getPaintings();
// }, [])

//     console.log(paintings);

//     const getData = getDocs(collectionRef)
//             .then((response) => {
//                     response.docs.map((item) => {
//                         return { ...item.data(), id: item.id };
//                     })
//             })

//     const deleteData = () => {
//         const docToUpdate = doc(database, 'paintings', 'C6Zh8R0Fk1pfuqq2z9jg')
//         deleteDoc(docToUpdate)
//             .then(() => {
//             alert('data deleted')
//             })
//             .catch((err) => {
//             alert(err.message)
//         })
//     }

//     const updateBruceLee = () => {
//         const docToUpdate = doc(database, 'paintings', 'C6Zh8R0Fk1pfuqq2z9jg')
//         updateDoc(docToUpdate, {
//         'characters.BruceLee.found': true
//         })
//             .then(() => {
//             alert('data updated')
//             })
//             .catch((err) => {
//             alert(err.message)
//         })
//     }
//     const updateMarilynMonroe = () => {
//         const docToUpdate = doc(database, 'paintings', 'C6Zh8R0Fk1pfuqq2z9jg')
//         updateDoc(docToUpdate, {
//         'characters.MarilynMonroe.found': true
//         })
//             .then(() => {
//             alert('data updated')
//             })
//             .catch((err) => {
//             alert(err.message)
//         })
//     }
//     const updateAlbertEinstein = () => {
//         const docToUpdate = doc(database, 'paintings', 'C6Zh8R0Fk1pfuqq2z9jg')
//         updateDoc(docToUpdate, {
//         'characters.AlbertEinstein.found': true
//         })
//             .then(() => {
//             alert('data updated')
//             })
//             .catch((err) => {
//             alert(err.message)
//         })
//     }

//     const [targetBox, setTargetBox] = useState(false);

//     const [targetBoxPosition, setTargetBoxPosition] = useState({ x: 0, y: 0});

//     const divineComedyInfo = cardData[0];

//     function between(x, min, max) {
//         return x >= min && x <= max;
//     }
//     const divineComedyCharacters = divineComedyInfo.characters;

//     const [findCharacter, setFindCharacter] = useState(divineComedyCharacters);

//     const checkCharacters = (e) => {

//         setTargetBox(prevTargetBox => !prevTargetBox);

//         setTargetBoxPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

//         let coordinateX = e.nativeEvent.offsetX;
//         let coordinateY = e.nativeEvent.offsetY;
//         if (between(coordinateX, divineComedyCharacters.BruceLee.x1, divineComedyCharacters.BruceLee.x2) && between(coordinateY, divineComedyCharacters.BruceLee.y1, divineComedyCharacters.BruceLee.y2)) {
//             setFindCharacter(prevFindCharacter => {
//                 return {
//                     ...prevFindCharacter,
//                     BruceLee: { found: true },
//                 }
//             })
//         } else if (between(coordinateX, divineComedyCharacters.MarilynMonroe.x1, divineComedyCharacters.MarilynMonroe.x2) && between(coordinateY, divineComedyCharacters.MarilynMonroe.y1, divineComedyCharacters.MarilynMonroe.y2)) {
//             setFindCharacter(prevFindCharacter => {
//                 return {
//                     ...prevFindCharacter,
//                     MarilynMonroe: { found: true },
//                 }
//             })
//         } else if (between(coordinateX, divineComedyCharacters.AlbertEinstein.x1, divineComedyCharacters.AlbertEinstein.x2) && between(coordinateY, divineComedyCharacters.AlbertEinstein.y1, divineComedyCharacters.AlbertEinstein.y2)) {
//             setFindCharacter(prevFindCharacter => {
//                 return {
//                     ...prevFindCharacter,
//                     AlbertEinstein: { found: true },
//                 }
//             })
//         }
//     }

//     useEffect(() => {
//         let checkTruth = []
//         for (const key in findCharacter) {
//             checkTruth.push(findCharacter[key].found)
//         }
//         if (checkTruth.every(element => element === true)) {
//             console.log('game won')
//         }
//     }, [findCharacter]);

//     const targetBoxStyle = {
//         borderRadius: '50%',
//         position: 'absolute',
//         width: '100px',
//         height: '100px',
//         top: `${targetBoxPosition.y - 50}px`,
//         left: `${targetBoxPosition.x - 50}px`,
//        backdropFilter: 'brightness(130%)'
//     }

//     return (
//         <div className="divine-comedy">
//             {
//                 targetBox &&
//                 <div className="target-box" style={targetBoxStyle} onClick={() => setTargetBox(prevTargetBox => !prevTargetBox)}>
//                         <div className='select-character-box'>
//                             <h1>Character 1</h1>
//                             <h1>Character 2</h1>
//                             <h1>Character 3</h1>
//                         </div>
//                 </div>
//             }
//             <div>
//                 <button onClick={updateBruceLee}>UPDATE DATA</button>
//             </div>
//             <div className="gameboard-image-container" onClick={checkCharacters}>
//                 <img src={divineComedyInfo.src} id={divineComedyInfo.displayId} alt='' />
//             </div>
//         </div>
//     )

// }

// export default DivineComedy;


