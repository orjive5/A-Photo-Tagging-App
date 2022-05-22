import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cardData from './components/cardData'
import Card from './components/Card'

function App() {

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
