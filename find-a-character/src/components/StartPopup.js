import React from "react";
import { Link } from "react-router-dom";

const StartPopup = (props) => {
    return (
        <div className="start-popup">
            <div className="overlay"></div>
            <div className="start-popup-content">
                <label htmlFor='enter-your-name'>ENTER YOUR NAME</label>
                <input type='text' placeholder="Your name" id='enter-your-name' onChange={props.handleUsername}></input>
                <h1>YOUR TASK IS TO FIND:</h1>
                {props.leftToFind}
                <div className="gameboard-buttons">
                    <button onClick={props.handleStartGame}>START GAME</button>
                    <Link to='/'>
                        <button>HOME</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default StartPopup;