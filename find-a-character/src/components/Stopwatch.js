import React, { useEffect, useState } from "react";
import Timer from "./Timer";
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

function StopWatch() {

    const [divineComedyData, setDivineComedyData] = useState({});
    const divineComedyRef = doc(database, 'paintings', 'C6Zh8R0Fk1pfuqq2z9jg');

    useEffect(() => {
        const getDivineComedy = async () => {
            const divineComedySnap = await getDoc(divineComedyRef);

            if (divineComedySnap.exists()) {
                setDivineComedyData(divineComedySnap.data())
            } else {
                console.log("No such document!");
            }
        }

        getDivineComedy();
        
    }, []);

const [isActive, setIsActive] = useState(false);
const [isPaused, setIsPaused] = useState(true);
const [time, setTime] = useState(0);

useEffect(() => {
    
	let interval = null;

	if (isActive && isPaused === false) {
	interval = setInterval(() => {
		setTime((time) => time + 10);
	}, 10);
	} else {
	clearInterval(interval);
	}
	return () => {
	clearInterval(interval);
	};
}, [isActive, isPaused]);
    
    useEffect(() => {
        onSnapshot(doc(database, 'paintings', 'C6Zh8R0Fk1pfuqq2z9jg'), (doc) => {
            setDivineComedyData(doc.data())
        })
    }, []);
    
    useEffect(() => {
        setIsActive(true);
	    setIsPaused(false);
        if (divineComedyData.stopwatchReset === true) {
            handleReset();
        updateDoc(divineComedyRef, {
            'stopwatchReset': false
        })
        }
    }, [divineComedyData])

const handleStart = () => {
	setIsActive(true);
	setIsPaused(false);
};

const handlePauseResume = () => {
	setIsPaused(!isPaused);
};

const handleReset = () => {
	setIsActive(false);
	setTime(0);
};

return (
	<div className="stop-watch">
	<Timer time={time} />
	</div>
);
}

export default StopWatch;
