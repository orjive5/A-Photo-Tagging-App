import React from "react";
import { Link } from "react-router-dom";

const Gameover = () => {
    return (
        <div>
            <Link to='/'>
                <button>Home</button>
            </Link>
            <Link to='/gameboard'>
                <button>Gameboard</button>
            </Link>
        </div>
    );
}

export default Gameover;