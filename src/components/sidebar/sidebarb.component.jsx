import React from 'react'
import { Button, Sidebar } from 'semantic-ui-react'
import { signOutStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux'
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
                <Button onClick={signOutStart}>Cerrar sesion</Button>
            </div>
        </Sidebar>
    )
}

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
  });

export default connect(
    mapDispatchToProps
)(SidebarUser);