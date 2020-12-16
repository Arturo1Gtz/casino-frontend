import React from 'react';
import { connect } from 'react-redux';

import './user.style.scss';

const User = ({currentUser}) => {
    
    return(
        
        <div className='user'>
            <div className={'user__cont'}>
                <h1><b>Mi cuenta</b></h1>
                <img className={'user__cont__icon'} src={currentUser.imgurl} alt={currentUser.nickname}></img>
                <span>{currentUser.nickname}</span>
                <span>{currentUser.firstname} {currentUser.lastname}</span>
                <span>Departamento: {currentUser.department}</span>
                <span>Empresa: {currentUser.enterprise}</span>
                <span>Creditos: {currentUser.credits}</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(
    mapStateToProps,
    null
)(User);