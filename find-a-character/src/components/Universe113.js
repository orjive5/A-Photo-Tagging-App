import React, {useState, useEffect} from "react";
import cardData from "./cardData";
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
// import { async } from "@firebase/util";

const Universe113 = () => {

    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');

    const [paintings, setPaintings] = useState([]);
    const paintingsCollectionRef = collection(database, 'paintings');

    const createPainting = async () => {
        await addDoc(paintingsCollectionRef, { title: newTitle, author: newAuthor });
    }

    const updatePainting = async (id, age) => {

        const paintingDoc = doc(database, 'paintings', id)
        const newFields = { age: age+1 };
        await updateDoc(paintingDoc, newFields);
    }

    useEffect(() => {
        const increaseAge = onSnapshot(paintingsCollectionRef, (snapshot) => {
        setPaintings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });

        return () => {
            increaseAge();
        }
    }, [])

    useEffect(() => {
        const getPaintings = async () => {
            const data = await getDocs(paintingsCollectionRef);
            console.log(data);
            setPaintings(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getPaintings();
    }, []);

    return (
        <div className="universe-113">

            <input placeholder="Title..." onChange={(event) => {setNewTitle(event.target.value)}} />
            <input placeholder="Author..." onChange={(event) => {setNewAuthor(event.target.value)}} />

            <button onClick={createPainting}>Create Painting</button>


            {paintings.map((painting) => {
                return (
                    <div>
                        <h1>Title: {painting.title}</h1>
                        <h1>Author: {painting.author}</h1>
                        <h1>Age: {painting.age}</h1>
                        <h1>ID: {painting.id}</h1>
                        <button onClick={() => {updatePainting(painting.id, painting.age)}}>Increase age</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Universe113;