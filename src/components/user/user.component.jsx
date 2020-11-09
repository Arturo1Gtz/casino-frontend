import React, { useState } from 'react';
import { connect } from 'react-redux';
import ImageInput from '../register/imagereader.component'
import './user.style.scss'

const User = ({currentUser}) => {
    const [transfer, setTransfer] = useState(null);
    const [recieve, setRecieve] = useState(null);
    
   
        
    return(
        <div className='contenido'>
            <span>Hola soy el usuario {currentUser.nickname}</span>
            <div className = 'userIcon'>
                <img className = 'icon' src={currentUser.imgurl} alt={currentUser.nickname}></img>
            </div>
        </div>)
        



}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(
    mapStateToProps,
    null
)(User);