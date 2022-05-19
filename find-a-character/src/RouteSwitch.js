import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Gameboard from './components/Gameboard';
import Gameover from './components/Gameover';

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/gameboard' element={<Gameboard />} />
                <Route path='/gameover' element={<Gameover />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;