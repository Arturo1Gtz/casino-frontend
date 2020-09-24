import React, { useState } from 'react';
import {Link} from 'react-router-dom';
// import {ReactComponent as Logo} from '../../img/logo.png';
import menu from '../../img/menuIcon.svg';
import logo from '../../img/logo.png';
import SidebarA from '../../components/sidebar/sidebar.component';
import './header.style.css';
import SidebarUser from '../sidebar/sidebarb.component';
//import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
//import { selectCurrentUser } from '../../redux/user/user.selectors'

const Header = ({currentUser}) => {

    const [isvisible, setIsVisible] = useState(false);

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
            {currentUser ? 
            <SidebarUser isvisible={isvisible} onhide={()=>setIsVisible(!isvisible)}></SidebarUser>
            :
            <SidebarA isvisible={isvisible} onhide={()=>setIsVisible(!isvisible)}></SidebarA>
            }
        </div>
    )
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect( 
    mapStateToProps,
    null
)(Header);