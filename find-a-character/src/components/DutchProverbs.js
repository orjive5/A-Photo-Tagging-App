import React from "react";
import cardData from "./cardData";


const DutchProverbs = () => {

    const dutchProverbsInfo = cardData[1];

    return (
        <div className="divine-comedy">
            <div className="gameboard-image-container">
                <img src={dutchProverbsInfo.src} id={dutchProverbsInfo.displayId} alt='' />
            </div>
        </div>
    )

}

export default DutchProverbs;