import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import { collection, doc, getDocs } from "firebase/firestore";
import { app, database } from './firebaseConfig'

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const querySnapshot = async () => {
      const getData = await getDocs(collection(database, 'paintings'));
      setData(getData.docs.map(doc => {
        return {
          ...doc.data(),
          paintingId: doc.id,
        }
      }));
    }

    querySnapshot();

  }, [])

  const displayCards = data.map(element => {
    return (
      <Card
          to={element.to}
          key={element.id}
          id={element.id}
          title={element.title}
          author={element.author}
          src={element.src}
          paintingId={element.paintingId}
         />
    )
  })

  return (
    <div className="app">
      <header>
        <h1>FIND A DETAIL</h1>
      </header>
      <h1>SELECT YOUR GAME:</h1>
      <div className='display-cards'>
        {displayCards}
      </div>
    </div>
  );
}

export default App;
