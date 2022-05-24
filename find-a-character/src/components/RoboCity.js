import React from "react";
import cardData from "./cardData";


const RoboCity = () => {

    const roboCityInfo = cardData[2];

    return (
        <div className="divine-comedy">
            <div className="gameboard-image-container">
                <img src={roboCityInfo.src} id={roboCityInfo.displayId} alt='' />
            </div>
        </div>
    )

}

export default RoboCity;