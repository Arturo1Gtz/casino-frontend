import React, {useState,useEffect} from 'react';

import CustomBoton from '../custom-boton/custom-boton.componente';

import Icon from '../../img/userphoto.svg';
// import Ficha1 from '../../img/fichaUno.png';
import Ficha50 from '../../img/casino50.png';
import Ficha100 from '../../img/casino100.png';
import Ficha500 from '../../img/casino500.png';
import Ficha1000 from '../../img/casino1000.png';
import Ficha5 from '../../img/fichaCinco.png';
import Salir from '../../img/SALIR.svg';

import './jugador.style.scss';

function Jugador (props){
   
    var {levantarse, apostar, onGame, apuesta, monto, fichas, aumentar, clean, bet, avatar} = props;

    console.log("avatar", avatar)

        return(
         <div className='jugador'>
            <div className='ImgCont'>
                <img src={avatar} alt ='User' className='Img'/>
            </div>
            <div className='relleno'> <span>relleno</span></div> 

            <div className='jugador__tarjeta'>
                <div className={'jugador__tarjeta__cont'}>
                    { onGame?null:  
                        <img src={Salir} className={'jugador__tarjeta__cont__salir'} onClick={()=>levantarse()}/> 
                    }
                </div>

                <div className='jugador__tarjeta__MontoCont'>
                    <span className='jugador__tarjeta__MontoCont__Titulo'>Monto Actual:</span> <br/>
                    <span className='jugador__tarjeta__MontoCont__Monto'>$ {monto}</span>
                </div>
                <div className={`fichasCont ${apuesta?'off':null}`}>
                    <img className='ficha' alt='ficha' src={Ficha50} onClick={apuesta?null:()=>aumentar(50,0)}/>
                    <img className='ficha' alt='ficha' src={Ficha100} onClick={apuesta?null:()=>aumentar(100,1)}/>
                    <img className='ficha' alt='ficha' src={Ficha500} onClick={apuesta?null:()=>aumentar(500,2)}/>
                    <img className='ficha' alt='ficha' src={Ficha1000} onClick={apuesta?null:()=>aumentar(1000,3)}/>
                   
                </div>
                <div className={`botonesCont ${apuesta?'off':null}`}>
                    <CustomBoton type='button' onClick={apuesta?null:clean} color='rojo' lugar='tarj' >limpiar</CustomBoton>
                    <CustomBoton color='amarillo' lugar='tarj' onClick={apuesta ? null : ()=> apostar()}>apostar</CustomBoton>

                </div>
                <div className='apuestaCont' >
                    <div className='fichCont'>
                        <div className='fichas'>
                           {fichas[0].map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                        <div className='fichas'>
                           {fichas[1].map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                        <div className='fichas'>
                           {fichas[2].map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                        <div className='fichas'>
                           {fichas[3].map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                    </div>
                    {/* <div className={''}> */}
                        <span className='apuestaTotal'>{`$ ${bet ? bet : apuesta}`}</span>
                    {/* </div> */}
                    
                </div>
            </div>

         </div>
        )
    
};

export default Jugador;