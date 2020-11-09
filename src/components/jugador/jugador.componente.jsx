import React, {useState,useEffect} from 'react';

import CustomBoton from '../custom-boton/custom-boton.componente';

import Icon from '../../img/userphoto.svg';
// import Ficha1 from '../../img/fichaUno.png';
import Ficha5 from '../../img/fichaCinco.png';

import './jugador.style.scss';

function Jugador (props){
    console.log('jugador',props)
    var {apuesta,acumulado} = props.jugador;
    const[bet,setBet] = useState(apuesta);
    const[montoActual, setMonto] = useState(acumulado);
    const[chips, setChips] = useState([[],[],[],[]]);
    var {responder, apostar, onGame} = props;
        // let juego = this.props.onGame;

        const aumentaApuesta=(a)=>{
            console.log('aumenta', a)
            const suma = bet + a;
            const resta = montoActual - a;
            let vari = undefined;
            // let long = 0;
            
            switch(a){
                case 1:  vari=chips[0]; break;
                case 3:  vari=chips[1]; break;
                case 5:  vari=chips[2]; break;
                case 10: vari=chips[3]; break;
                default: break;
            }

            if(resta < 0 ||vari.length == 5){
                return
            }else{
                vari.push(1);
                setBet(suma);
                setMonto(resta);
            }
        }

        const limpiar=()=>{
            const suma = bet + montoActual;
            setBet(0)
            setMonto(suma)
            setChips([[],[],[],[]])
            
        }

    

        return(
         <div className='jugador'>
            <div className='ImgCont'>
                <img src={Icon} alt ='User' className='Img'/>
            </div>

            <div className='relleno'> <img alt='relleno' src={Icon} className='Img'/></div>
            
            <div className='tarjeta'>
                <div className='MontoCont'>
                    <span className='Titulo'>Monto Actual:</span> <br/>
                    <span className='Monto'>$ {montoActual}</span>
                </div>


             { onGame?  <div className={'abcdCont'}>
                    <span className='abcd' onClick={()=>responder('a')}>A</span>
                    <span className='abcd' onClick={()=>responder('b')}>B</span>
                    <span className='abcd' onClick={()=>responder('c')}>C</span>
                    <span className='abcd' onClick={()=>responder('d')}>D</span>

                </div>
                
                :<div className={`fichasCont ${apuesta?'off':null}`}>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={apuesta?null:()=>aumentaApuesta(1)}/>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={apuesta?null:()=>aumentaApuesta(3)}/>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={apuesta?null:()=>aumentaApuesta(5)}/>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={apuesta?null:()=>aumentaApuesta(10)}/>
                   
                </div>}

                <div className={`botonesCont ${apuesta?'off':null}`}>
                    <CustomBoton type='button' onClick={apuesta?null:limpiar} color='rojo' lugar='tarj' >limpiar</CustomBoton>
                    <CustomBoton color='amarillo' lugar='tarj' onClick={apuesta ? null : ()=> apostar(bet)}>apostar</CustomBoton>

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
                           {chips[0].map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                        <div className='fichas'>
                           {chips[1].map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                        <div className='fichas'>
                           {chips[2].map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                        <div className='fichas'>
                           {chips[3].map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                    </div>
                    <span className='apuestaTotal'>$ {bet}</span>
                    
                </div>
            </div>

         </div>
        )
    
};

export default Jugador;