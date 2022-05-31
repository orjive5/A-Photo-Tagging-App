import React from "react";
import { Link } from "react-router-dom";
import Timer from "./Timer";

const Header = (props) => {
    return (
        <header>
            <div>
                <h1>FIND A CHARACTER</h1>
                <h2>{props.username}</h2>
            </div>
            <Link to='/'>
                <button className="header-button">HOME</button>
            </Link>
            <button onClick={props.handleStartGame} className='header-button'>RESTART</button>
            <div className="left-to-find">
                <h1>Left to find:</h1>
                {props.leftToFind}
            </div>
            <div>
                Time:
                    <div className="stop-watch">
	                    <Timer time={props.time} />
	                </div>
            </div>
        </header>
    )
}

export default Header;