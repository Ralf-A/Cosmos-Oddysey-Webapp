import './App.css';
import Header from './Components/Header/Header.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteFinder from './Components/RouteFinder/RouteFinder.js';
import Reservation from './Pages/Reservation/Reservation.js';
import ReservedTravel from './Pages/ReservedTravel/ReservedTravel.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<RouteFinder />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/finished" element={<ReservedTravel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
