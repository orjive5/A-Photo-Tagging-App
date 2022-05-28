import React from "react";
import Timer from "./Timer";

const Header = (props) => {
    return (
        <header>
            <div>
                <h1>FIND A CHARACTER</h1>
                <h2>{props.username}</h2>
            </div>
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