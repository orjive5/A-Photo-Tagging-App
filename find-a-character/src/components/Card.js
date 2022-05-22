import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {

    return (
        <div className="card">
            <h1>{props.title}</h1>
            <h1>{props.author}</h1>
            <Link to={props.to}>
                <div className="image-container">
                    <img src={props.src} alt=''/>
                </div>
            </Link>
        </div>
    );
}

export default Card;