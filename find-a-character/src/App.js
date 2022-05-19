import React from 'react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Link to='/gameboard'>
        <button>Gameboard</button>
      </Link>
      <Link to='/gameover'>
        <button>Gameover</button>
      </Link>
    </div>
  );
}

export default App;
