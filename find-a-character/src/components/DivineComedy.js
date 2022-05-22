import React, {useState, useEffect} from "react";
import cardData from "./cardData";


const DivineComedy = () => {

    const divineComedyInfo = cardData[0];

    function between(x, min, max) {
        return x >= min && x <= max;
    }
    const divineComedyCharacters = divineComedyInfo.characters;

    const [findCharacter, setFindCharacter] = useState(divineComedyCharacters);

    const checkCharacters = (e) => {
        let coordinateX = e.nativeEvent.offsetX;
        let coordinateY = e.nativeEvent.offsetY;
        if (between(coordinateX, divineComedyCharacters.BruceLee.x1, divineComedyCharacters.BruceLee.x2) && between(coordinateY, divineComedyCharacters.BruceLee.y1, divineComedyCharacters.BruceLee.y2)) {
            setFindCharacter(prevFindCharacter => {
                return {
                    ...prevFindCharacter,
                    BruceLee: { found: true },
                }
            })
        } else if (between(coordinateX, divineComedyCharacters.MarilynMonroe.x1, divineComedyCharacters.MarilynMonroe.x2) && between(coordinateY, divineComedyCharacters.MarilynMonroe.y1, divineComedyCharacters.MarilynMonroe.y2)) {
            setFindCharacter(prevFindCharacter => {
                return {
                    ...prevFindCharacter,
                    MarilynMonroe: { found: true },
                }
            })
        } else if (between(coordinateX, divineComedyCharacters.AlbertEinstein.x1, divineComedyCharacters.AlbertEinstein.x2) && between(coordinateY, divineComedyCharacters.AlbertEinstein.y1, divineComedyCharacters.AlbertEinstein.y2)) {
            setFindCharacter(prevFindCharacter => {
                return {
                    ...prevFindCharacter,
                    AlbertEinstein: { found: true },
                }
            })
        }
    }

    useEffect(() => {
        let checkTruth = []
        for (const key in findCharacter) {
            checkTruth.push(findCharacter[key].found)
        }
        if (checkTruth.every(element => element === true)) {
            console.log('game won')
        }
    }, [findCharacter]);

    return (
        <div className="divine-comedy">
            <div className="gameboard-image-container" onClick={checkCharacters}>
                <img src={divineComedyInfo.src} id={divineComedyInfo.displayId} alt='' />
            </div>
        </div>
    )

}

export default DivineComedy;