import React, { useContext, useState } from 'react'
import './Navbar.css'
import logoImg from '../../assets/AppLogo.png'
import { PiListHeartDuotone } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";


const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState('home')
    const location = useLocation();
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext)

    const navigate = useNavigate()


    const handleScroll = (id) => {
        setMenu(id);
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const logout = ()=> {
        localStorage.removeItem('token')
        setToken('')
        navigate('/')
    }

  return (
    <div className='navbar'>
        <Link to='/'>
            <img 
                src={logoImg} alt="" className='logo'/>
        </Link>
        <ul className="navbar-menu">
            <Link to='/' 
                onClick={()=> setMenu('home')} 
                className={menu === 'home' ? 'active' : ''}>
                    Home
            </Link>
            {location.pathname !== '/cart' && (
                <li
                onClick={() => handleScroll('our-menu')}
                className={menu === 'menu' ? 'active' : ''}
                >
                    Menu
                </li>
            )}
            <li
                onClick={() => handleScroll('footer')}
                className={menu === 'contact-us' ? 'active' : ''}
            >
                Contact Us
            </li>
        </ul>
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <Link to='/cart'>
                    <PiListHeartDuotone className='cart-icon' />
                </Link>
                <div className={getTotalCartAmount()===0 ? '' : 'dot'}></div>
            </div>
            {!token ? 
            <button onClick={()=> setShowLogin(true)}>Sign In</button>
            : <div className='navbar-profile'>
                <IoPersonCircleOutline className='profile-icon'/>
                <ul className="navbar-profile-dropdown">
                    <div className='cart-line'></div>
                    <li onClick={logout}>
                        <MdLogout className='profile-icon' />
                        <p>Logout</p>
                    </li>
                </ul>
            </div>
            }
        </div>
    </div>
  )
}

export default Navbar
