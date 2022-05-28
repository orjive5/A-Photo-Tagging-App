// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// const Gameboard = (props) => {

//     const location = useLocation();
//     const {id, title, author, src, displayId, characters} = location.state;

//     function between(x, min, max) {
//         return x >= min && x <= max;
//     }
//     const divineComedyCharacters = {BruceLee: false, MarilynMonroe: false, AlbertEinstein: false}

//     const [findCharacter, setFindCharacter] = useState(divineComedyCharacters);

//     useEffect(() => {
//         let checkTruth = []
//         for (const key in findCharacter) {
//             checkTruth.push(findCharacter[key])
//         }
//         if (checkTruth.every(element => element === true)) {
//             console.log('game won')
//         }
//     }, [findCharacter]);

//     const checkCharacters = (e) => {
//         let coordinateX = e.nativeEvent.offsetX;
//         let coordinateY = e.nativeEvent.offsetY;
//         console.log(coordinateX);
//         console.log(coordinateY);
//         console.log(characters);
//         if (between(coordinateX, characters.BruceLee.x1, characters.BruceLee.x2) && between(coordinateY, characters.BruceLee.y1, characters.BruceLee.y2)) {
//             setFindCharacter(prevFindCharacter => {
//                 return {
//                     ...prevFindCharacter,
//                     BruceLee: true,
//                 }
//             })
//         } else if (between(coordinateX, characters.MarilynMonroe.x1, characters.MarilynMonroe.x2) && between(coordinateY, characters.MarilynMonroe.y1, characters.MarilynMonroe.y2)) {
//             setFindCharacter(prevFindCharacter => {
//                 return {
//                     ...prevFindCharacter,
//                     MarilynMonroe: true,
//                 }
//             })
//         } else if (between(coordinateX, characters.AlbertEinstein.x1, characters.AlbertEinstein.x2) && between(coordinateY, characters.AlbertEinstein.y1, characters.AlbertEinstein.y2)) {
//             setFindCharacter(prevFindCharacter => {
//                 return {
//                     ...prevFindCharacter,
//                     AlbertEinstein: true,
//                 }
//             })
//         }
//     }

//     return (
//         <div>
//             <header>
//                 <Link to='/'>
//                     <button>Home</button>
//                 </Link>
//                 <Link to='/gameover'>
//                     <button>Gameover</button>
//                 </Link>
//             </header>
//             <div className="gameboard-image-container" onClick={checkCharacters}>
//                 <img src={src} className='gameboard-image' id={displayId} alt='' />
//             </div>
//         </div>
//     );
// }

// export default Gameboard;