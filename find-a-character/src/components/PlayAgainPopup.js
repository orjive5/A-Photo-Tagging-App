import React from "react";
import { Link } from "react-router-dom";

const PlayAgainPopup = (props) => {
    return (
        <div className="play-again-popup">
            <div className="overlay"></div>
            <div className="play-again-popup-content">
                <h1>YOUR SCORE</h1>
                <h1>{props.username}</h1>
                <h2>
                    {("0" + Math.floor((props.score / 60000) % 60)).slice(-2)}:
                    {("0" + Math.floor(( props.score / 1000) % 60)).slice(-2)}
                </h2>
                <button onClick={props.handlePlayAgain}>PLAY AGAIN</button>
                <Link to='/'>
                    <button>HOME</button>
                </Link>
                <h1>TOP SCORES:</h1>
                {props.displayTopScores}
            </div>
        </div>
    )
}

export default PlayAgainPopup;