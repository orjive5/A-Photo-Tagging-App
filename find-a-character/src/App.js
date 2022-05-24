import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import cardData from './components/cardData'
import Card from './components/Card'
// import { app, database } from './firebaseConfig'
// import { collection, getDocs } from 'firebase/firestore'

function App() {

  // const collectionRef = collection(database, 'paintings');

  // const getData = () => {
  //   getDocs(collectionRef)
  //     .then((response) => {
  //     console.log(
  //       response.docs.map((item) => {
  //         return { ...item.data(), id: item.id };
  //       })
  //     );
  //   });
  // }

  // getData();

  const [data, setData] = useState(cardData);

  const displayCards = data.map(element => {
    return (
      <Card
            to={element.to}
            key={element.id}
            id={element.id}
            title={element.title}
            author={element.author}
            src={element.src}
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
