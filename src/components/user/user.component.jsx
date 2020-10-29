import React, { useState } from 'react';
//import { firestore } from '../../firebase/firebase.utils';;
import { connect } from 'react-redux';

const User = ({currentUser}) => {
    const [userData, setUserData] = useState(null);

    return(
        <div className='userIcon'>
            <span>Hola soy el usuario </span>
            <h2></h2>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(
    mapStateToProps(),
    null
)(User);