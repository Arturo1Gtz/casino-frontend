import React from 'react';
import {Link} from 'react-router-dom';
// import {ReactComponent as Logo} from '../../img/logo.png';
import menu from '../../img/menuIcon.svg';
import logo from '../../img/logo.png';
import SidebarA from '../../components/sidebar/sidebar.component';

import './header.style.css';

const Header =()=>{
    const [isvisible, setIsVisible] = React.useState(false)
    return(
        <div className='header'>
            <Link className='logoContainer' to="/" >
                <img src={logo} alt='logo' className='logo' ></img>
                {/* <Logo className='logo'/> */}
            </Link>
            <div className='menuContainer'>
                <img src={menu} alt='menu' className='menu' onClick={() => setIsVisible(true)}
                ></img>
            </div>
         <SidebarA  isvisible={isvisible} onhide={()=>setIsVisible(!isvisible)}/>
        </div>
    )
};

export default Header;