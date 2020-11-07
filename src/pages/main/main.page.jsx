import React from 'react';

import GameBanner from '../../components/gameBanner/gameBanner.component';

import './main.style.scss'
import fondoRuleta from '../../img/roulette.jpg'
// import fondoDados from '../../img/dados.jpg'
// import fondoPoker from '../../img/poker.jpg'



const MainPage = ({history})=> {
    function ruleta(){
        history.push('/ruleta');
    }

    return(
    <div className='mainContainer'>
      <GameBanner action={ruleta} titulo={'Mesa 1'} imagen={fondoRuleta}  />
      <GameBanner action={ruleta} titulo={'Mesa 2'} imagen={fondoRuleta}  />
      <GameBanner action={ruleta} titulo={'Mesa 3'} imagen={fondoRuleta}  />
      <GameBanner action={ruleta} titulo={'Mesa 4'} imagen={fondoRuleta}  />
      <GameBanner action={ruleta} titulo={'Mesa 5'} imagen={fondoRuleta}  />
      <GameBanner action={ruleta} titulo={'Mesa 6'} imagen={fondoRuleta}  />  
        
    </div>);
};

export default MainPage;