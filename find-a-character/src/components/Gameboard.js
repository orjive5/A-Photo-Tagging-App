import React from "react";
import { Link } from "react-router-dom";

const Gameboard = () => {
    return (
        <div>
            <Link to='/'>
                <button>Home</button>
            </Link>
            <Link to='/gameover'>
                <button>Gameover</button>
            </Link>
        </div>
    );
}

export default Gameboard;