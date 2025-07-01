import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img className='footer-logo' src={assets.logo_bottom} alt="" />
          <p>Food Prep is a full-stack project designed for understanding and learning how to build a full-stack development project.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Courses</li>
            
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91 89076 76543</li>
            <li>adrikabharti@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="footer-hr" />
      <p className='footer-copyright'>Copyright 2025 @ Adrika Bharti . All rights reserved.</p>
    </div>
  )
}

export default Footer