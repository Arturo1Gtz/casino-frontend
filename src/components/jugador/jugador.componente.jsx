import React, {useState,useEffect} from 'react';

import CustomBoton from '../custom-boton/custom-boton.componente';

import Icon from '../../img/userphoto.svg';
// import Ficha1 from '../../img/fichaUno.png';
import Ficha5 from '../../img/fichaCinco.png';

import './jugador.style.scss';

function Jugador (props){
   
    var {responder, levantarse, apostar, onGame, apuesta, monto, fichas, aumentar, clean, respuesta,bet, avatar} = props;

    console.log("avatar", avatar)
    // const[bet,setBet] = useState(apuesta);
    // const[montoActual, setMonto] = useState(acumulado);

    // const[chips, setChips] = useState([[],[],[],[]]);

    // let bet = 0
    // let montoActual = acumulado   

        return(
         <div className='jugador'>
            <div className='ImgCont'>
                <img src={avatar} alt ='User' className='Img'/>
            </div>

            <div className='relleno'> <img alt='relleno' src={avatar} className='Img'/></div>
            
            <div className='tarjeta'>
                <div className={'tarjeta__cont'}>
                { onGame?null:  
                    <span className={'tarjeta__cont__salir'} onClick={()=>levantarse()}> SALIR </span>
                }
                </div>
                <div className='MontoCont'>
                    <span className='Titulo'>Monto Actual:</span> <br/>
                    <span className='Monto'>$ {monto}</span>
                </div>


             { onGame?  
                <div className={`abcdCont ${respuesta ?'off':null}` }>
                    <span className='abcd' onClick={respuesta ? null : ()=>responder('a')}>A</span>
                    <span className='abcd' onClick={respuesta ? null : ()=>responder('b')}>B</span>
                    <span className='abcd' onClick={respuesta ? null : ()=>responder('c')}>C</span>
                    <span className='abcd' onClick={respuesta ? null : ()=>responder('d')}>D</span>

                </div>
                
                :<div className={`fichasCont ${apuesta?'off':null}`}>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={apuesta?null:()=>aumentar(1,0)}/>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={apuesta?null:()=>aumentar(3,1)}/>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={apuesta?null:()=>aumentar(5,2)}/>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={apuesta?null:()=>aumentar(10,3)}/>
                   
                </div>}

                <div className={`botonesCont ${apuesta?'off':null}`}>
                    <CustomBoton type='button' onClick={apuesta?null:clean} color='rojo' lugar='tarj' >limpiar</CustomBoton>
                    <CustomBoton color='amarillo' lugar='tarj' onClick={apuesta ? null : ()=> apostar()}>apostar</CustomBoton>

                </div>
            
            
                <div className='apuestaCont' >
                    <div className='fichCont'>
                    {/* {chips.map(function(fila){
                        <div className='fichas'>{
                           fila.map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                    })} */}

                            
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
                    <span className='apuestaTotal'>{`$ ${bet ? bet : apuesta}`}</span>
                    
                </div>
            </div>

         </div>
        )
    
};

export default Jugador;