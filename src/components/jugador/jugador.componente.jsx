import React from 'react';

import Icon from '../../img/userphoto.svg';
import Ficha1 from '../../img/fichaUno.png';
import Ficha5 from '../../img/fichaCinco.png';

import './jugador.style.scss';

class Jugador extends React.Component{
    render(){
        return(
         <div className='jugador'>
            <div className='ImgCont'>
                <img src={Icon} className='Img'/>
            </div>

            <div className='relleno'> <img src={Icon} className='Img'/></div>
            
            <div className='tarjeta'>
                <div className='MontoCont'>
                    <span className='Titulo'>Monto Actual:</span> <br/>
                    <span className='Monto'>$2000.00</span>
                </div>
                <div className='fichasCont'>
                    <img src={Ficha5}/>
                    <img src={Ficha5}/>
                    <img src={Ficha5}/>
                </div>
                <div className='apuesta'>

                    <span className='SubTitle'>APUESTA</span>
                    
                </div>
            </div>

         </div>
        )
    }
};

export default Jugador;