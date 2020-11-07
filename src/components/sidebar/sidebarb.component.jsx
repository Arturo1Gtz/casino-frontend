import React from 'react'
import { connect } from 'react-redux'
import { Button, Sidebar } from 'semantic-ui-react'
import User from '../user/user.component'
import { auth } from '../../firebase/firebase.utils'

const SidebarUser = (props, currentUser) => {
    
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
                <div className = 'formulario'>
                    <Button onClick={() => auth.signOut()}>Cerrar sesion</Button>
                </div>
                
            </div>
        </Sidebar>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(
    mapStateToProps,
    null
)(SidebarUser);