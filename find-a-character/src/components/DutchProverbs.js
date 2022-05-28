import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { app, database } from '../firebaseConfig'
import {
    collection,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    onSnapshot,
} from 'firebase/firestore'
import { nanoid } from 'nanoid'
import Timer from "./Timer";


const DutchProverbs = () => {

    const [dutchProverbsData, setDutchProverbsData] = useState({});
    const dutchProverbsRef = doc(database, 'paintings', 'MrNnfOmt1nuj7QBDDl3H');

    useEffect(() => {
        const getDutchProverbs = async () => {
        const dutchProverbsSnap = await getDoc(dutchProverbsRef);

            if (dutchProverbsSnap.exists()) {
                setDutchProverbsData(dutchProverbsSnap.data())
            } else {
                console.log("No such document!");
            }
        }

        getDutchProverbs();
        
    }, [])

    return (
        <div className="divine-comedy">
            <div className="gameboard-image-container">
                <img src={dutchProverbsData.src} id={dutchProverbsData.displayId} alt='' />
            </div>
        </div>
    )

}

export default DutchProverbs;