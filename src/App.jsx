import React, {useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Favorite from './pages/Favorite/Favorite'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import FoodDetails from './components/FoodDetails/FoodDetails'


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 

  

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} setSearchQuery={setSearchQuery} /> 
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} /> 
          <Route path="/cart" element={<Favorite />} />
          <Route path='/food/:id' element={<FoodDetails />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
