import React from 'react'
import './OurMenu.css'
import { menu_list } from '../../assets/assets'

const OurMenu = ({category, setCategory}) => {


  return (
    <section className='our-menu' id='our-menu'>
        <h2>Our Menu</h2>
        <div className="menu-list">
            {menu_list.map((item, index)=> {
                return (
                    <div onClick={()=> setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)} key={index} className='menu-list-itme'>
                        <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt='' />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <div className="line"></div>
    </section>
  )
}

export default OurMenu
