import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
    const [imageSource, setImageCourse] = useState(props.src)
    return (
        <div className="card">
            <h1>{props.title}</h1>
            <h1>{props.author}</h1>
            <Link to='/gameboard' state={{ id: props.id, title: props.title, author: props.author, src: props.src }}>
            <div className="image-container">
                <img src={props.src} />
            </div>
            </Link>
        </div>
    );
}

export default Card;