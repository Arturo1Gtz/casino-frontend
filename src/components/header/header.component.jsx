import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
// import {ReactComponent as Logo} from '../../img/logo.png';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import menu from '../../img/menuIcon.svg';
import logo from '../../img/logo.png';
import SidebarA from '../../components/sidebar/sidebar.component';
import './header.style.css';
import SidebarUser from '../sidebar/sidebarb.component';

const Header = () => {

    const [isvisible, setIsVisible] = useState(false)
    const [userstate, setUserstate] = useState(null)
    
    useEffect( () => {
        auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    setUserstate({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                })
            } else {
                setUserstate(userAuth);  
            }
      });
    })

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
            {userstate ? 
            <SidebarUser isvisible={isvisible} onhide={()=>setIsVisible(!isvisible)}></SidebarUser>
            :
            <SidebarA isvisible={isvisible} onhide={()=>setIsVisible(!isvisible)}></SidebarA>
            }
        </div>
    )
};

export default Header;