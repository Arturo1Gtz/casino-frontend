import React from 'react'
import { connect } from 'react-redux'
import { Button, Sidebar } from 'semantic-ui-react'
import User from '../user/user.component'
import { auth } from '../../firebase/firebase.utils'
import CustomButton from '../custom-button/button.component';

import './sidebarB.style.scss'

const SidebarUser = (props, {currentUser}) => {
    return(
        <Sidebar 
        animation='overlay'
        direction='right'
        icon='labeled'
        onHide={props.onhide}
        vertical visible={props.isvisible}
        className='sidebar'
        >
            <div className={'sidebar__content'}>
                <div className={'sidebar__content__user'}>
                <User />
                </div>
                <div className ={'sidebar__content__btn'}>
                <CustomButton onClick={() => auth.signOut()}>Cerrar sesion</CustomButton>
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