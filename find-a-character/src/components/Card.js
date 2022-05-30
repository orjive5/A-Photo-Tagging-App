import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {

    return (
        <div className="card">
            <h1 className="title-card">{props.title}</h1>
            <h1 className="author-card">{props.author}</h1>
            <Link to='/gameboard' state={{ paintingId: props.paintingId }}>
                <div className="image-container">
                    <img src={props.src} alt=''/>
                </div>
            </Link>
        </div>
    );
}

export default Card;