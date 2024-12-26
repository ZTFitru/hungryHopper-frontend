import React from 'react'
import './Header.css'

const Header = () => {

  const handleScrollToMenu = () => {
    const menuSection = document.getElementById('our-menu'); 
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' }); 
    }
  };

  return (
    <div className='header'>
        <div className="header-cont">
            <h1 className='header-text'>
                WELCOME
            </h1>
            <button onClick={handleScrollToMenu}>View Menu</button>
        </div>
    </div>
  )
}

export default Header
