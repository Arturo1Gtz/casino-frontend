import React, { useState } from 'react';
import { connect } from 'react-redux';
import ImageInput from '../register/imagereader.component'

const User = ({currentUser}) => {
    const [transfer, setTransfer] = useState(null);
    const [recieve, setRecieve] = useState(null);
    
   
        if (currentUser.imgurl == '') {
            return <ImageInput/>
        } else {
            return <div>
                <span>Hola soy el usuario {currentUser.nickname}</span>
                <img src={currentUser.imgurl}></img>
            </div>
        }



}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(
    mapStateToProps,
    null
)(User);