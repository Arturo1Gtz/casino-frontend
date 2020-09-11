import React from 'react'
import { Button, Sidebar } from 'semantic-ui-react'
import { auth } from '../../firebase/firebase.utils';
import User from '../user/user.component'

const SidebarUser = (props) => {
    
    return(
        <Sidebar 
        animation='overlay'
        direction='right'
        icon='labeled'
        onHide={props.onhide}
        vertical visible={props.isvisible}
        className='sidebar'
        >
            <div className='contenido'>
                <User/>
                <Button onClick= {() => auth.signOut()}>Cerrar sesion</Button>
            </div>
        </Sidebar>
    )
}

export default SidebarUser;