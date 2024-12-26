import React from 'react'
import './Footer.css'
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import logoImg from '../../assets/footerImg.png'
import { MdOutlineEmail } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa6";


const Footer = () => {
  return (
    <section className='footer' id='footer'>
        <div className="footer-cont">
            <div className="footer-left">
                <img src={logoImg} alt="" />
                <p>Follow us on Instagram, Twitter, and Facebook.</p>
                <div className="social-icons">
                    <FaInstagram className='social-icon' />
                    <BsTwitterX className='social-icon'/>
                    <FaFacebookSquare className='social-icon'/>
                </div>
            </div>
            <div className="footer-center">
                <h4>Company</h4>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-right">
                <h5>GET IN TOUCH</h5>
                <p>If you want to suggest a recipe, click on the mail icon and send us an email.</p>
                <ul>
                    <li>
                        <MdOutlineEmail className='social-icon'/>
                    </li>
                </ul>
            </div>
        </div>
        <div className='footer-line'></div>
        <p className="footer-copyright">
            Copyright 2024 <FaRegCopyright /> Hungry Hopper
        </p>
    </section>
  )
}

export default Footer;
