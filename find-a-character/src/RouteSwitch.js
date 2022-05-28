import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
// import Gameboard from './components/Gameboard';
// import Gameover from './components/Gameover';
import DivineComedy from './components/DivineComedy';
import DutchProverbs from './components/DutchProverbs';
// import RoboCity from './components/RoboCity';
// import Universe113 from './components/Universe113';

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/discussing-the-divine-comedy-with-dante' element={<DivineComedy />}></Route>
                <Route path='/the-dutch-proverbs' element={<DutchProverbs />}></Route>
                {/* <Route path='/robo-city' element={<RoboCity />}></Route>
                <Route path='/universe-113' element={<Universe113 />}></Route> */}
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;