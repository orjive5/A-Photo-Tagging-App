import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Gameboard from './components/Gameboard';


const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/gameboard' element={<Gameboard />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;