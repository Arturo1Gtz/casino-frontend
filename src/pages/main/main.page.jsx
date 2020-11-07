import React from 'react';
import './main.style.scss'
import SignInAndSignUpPage from '../signin-signup/inicio'
import RoomsPaige from '../rooms/rooms.component';
import { connect } from 'react-redux';



const MainPage = ({currentUser}) => {

    return(
        <div className='mainContainer'>
            
                {currentUser ? 
                    <RoomsPaige/>
                    :
                    <SignInAndSignUpPage/>
                }
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(
    mapStateToProps,
    null
)(MainPage);