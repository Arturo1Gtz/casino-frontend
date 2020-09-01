import React , {useState} from 'react';

import GameBanner from '../../components/gameBanner/gameBanner.component';

import './main.style.scss'
import fondoDados from '../../img/dados.jpg'
import fondoRuleta from '../../img/roulette.jpg'
import fondoPoker from '../../img/poker.jpg'



const MainPage = ({history})=> {
    function ruleta(){
        history.push('/ruleta');
    }

    return(
    <div className='mainContainer'>

      <GameBanner titulo={'dados'}  imagen={fondoDados} />  
      <GameBanner action={ruleta} titulo={'ruleta'} imagen={fondoRuleta}  />  
      <GameBanner   titulo={'poker'} imagen={fondoPoker}/>  
        
    </div>);
};

export default MainPage;