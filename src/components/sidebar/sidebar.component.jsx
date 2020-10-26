import React,{ useState } from 'react';
import { Sidebar } from 'semantic-ui-react';

import SignIn from '../signin/signin.component';
import Register from '../register/register.component';

import fondoBar from '../../img/fondobanner.jpg';
import userIcon from '../../img/userphoto.svg';
import './sidebar.style.scss';

const SidebarA = (props) => {
    const [sesion, setSesion] = useState(true)
        
    return(
        <Sidebar animation='overlay' direction='right' icon='labeled' onHide={props.onhide} vertical visible={props.isvisible} className='sidebar'>
            <div className='imagenBar' style={{backgroundImage: `url(${fondoBar})`}}   />
            <div className='contenido'>
                <div className='thanks'>
                    <span >
                            Bienvenido al <br/> Casino Gran Torino.
                    </span>
                </div>
                <div className='userIcon'>
                    <img src={userIcon} alt='userIcon' className='icon'/>
                </div>
                <div className='formType'>
                     <span className={`optionForm ${sesion?'active':null}`} onClick={()=>setSesion(true)}>Inicia Sesión /</span>
                     <span className={`optionForm ${sesion?null:'active'}`} onClick={()=>setSesion(false)}>/ Registrate</span>
                </div>
                <div className='formulario'>
                {
                    sesion ? <SignIn/>:
                    <Register/>
                }
                </div>
            </div>
        </Sidebar>
    );
    
}


export default SidebarA