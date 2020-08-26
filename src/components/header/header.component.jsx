import React from 'react';
import {Link} from 'react-router-dom';
// import {ReactComponent as Logo} from '../../img/logo.png';
import menu from '../../img/menuIcon.svg';
import logo from '../../img/logo.png';

import './header.style.css';

const Header =()=>{
    return(

        <div className='header'>
        <Link className='logoContainer' to="/" >
            <img src={logo} alt='logo' className='logo' ></img>
            {/* <Logo className='logo'/> */}
        </Link>
        <div className='menuContainer'>
            <img src={menu} alt='menu' className='menu' ></img>
        </div>

    </div>

)
};

export default Header;