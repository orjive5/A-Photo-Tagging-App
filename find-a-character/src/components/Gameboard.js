import React from "react";
import { Link, useLocation } from "react-router-dom";

const Gameboard = (props) => {

    const location = useLocation();
    const {id, title, author, src} = location.state;

    const checkCoordinates = (event) => {
        let x = event.nativeEvent.offsetX;
        let y = event.nativeEvent.offsetY;
        console.log(`X: ${x}, Y: ${y}`)
    }

    const checkBruceLee = (event) => {
        // let x1 = props.character.BruceLee.x1;
        // let x2 = props.character.BruceLee.x2;
        // let y1 = props.character.BruceLee.y1;
        // let y2 = props.character.BruceLee.y2;
        // let coordinateX = event.nativeEvent.offsetX;
        // let coordinateY = event.nativeEvent.offsetY;
        console.log(props.character.BruceLee)
        // console.log(x1)
        // console.log(x2)
        // console.log(y1)
        // console.log(y2)
        // if (coordinateX >= x1 && coordinateX <= x2 ){
        //     console.log('x is correct')
        // } else {
        //     console.log('x not correct')
        // }
    }

    return (
        <div>
            <header>
                <Link to='/'>
                    <button>Home</button>
                </Link>
                <Link to='/gameover'>
                    <button>Gameover</button>
                </Link>
            </header>
            <div className="gameboard-image-container" onClick={checkBruceLee}>
                <img src={src} className='gameboard-image'/>
            </div>
        </div>
    );
}

export default Gameboard;