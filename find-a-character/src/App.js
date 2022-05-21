import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cardData from './components/cardData'
import Card from './components/Card'

function App() {

  const displayCards = cardData.map(element => {
    return (
        <Card
            key={element.id}
            id={element.id}
            title={element.title}
            author={element.author}
            src={element.src}
            character={element.character}
         />
    )
  })

  return (
    <div className="app">
      <header>
      <Link to='/gameboard'>
        <button>Gameboard</button>
      </Link>
      <Link to='/gameover'>
        <button>Gameover</button>
      </Link>
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
