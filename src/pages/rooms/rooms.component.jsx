import React from 'react';
import GameBanner from '../../components/gameBanner/gameBanner.component';
import ImageIput from '../../components/register/imagereader.component';
import './rooms.styles.scss';
import fondoDados from '../../img/dados.jpg';
import fondoRuleta from '../../img/roulette.jpg';
import fondoPoker from '../../img/poker.jpg';
import { connect } from 'react-redux';



const RoomsPaige = ({history, currentUser})=> {
    function ruleta(){
        history.push('/ruleta');
    }
    if(currentUser.imgurl != "") {
      return(
        <div className='mainContainer'>
          <GameBanner action={ruleta} titulo={'Mesa 1'} imagen={fondoRuleta}  />
          <GameBanner action={ruleta} titulo={'Mesa 2'} imagen={fondoRuleta}  />
          <GameBanner action={ruleta} titulo={'Mesa 3'} imagen={fondoRuleta}  />
          <GameBanner action={ruleta} titulo={'Mesa 4'} imagen={fondoRuleta}  />
          <GameBanner action={ruleta} titulo={'Mesa 5'} imagen={fondoRuleta}  />
          <GameBanner action={ruleta} titulo={'Mesa 6'} imagen={fondoRuleta}  />  
        </div>
      )
      
    }else{
        return(
          <ImageIput></ImageIput>
        )
    }
    
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(
  mapStateToProps,
  null
)(RoomsPaige);