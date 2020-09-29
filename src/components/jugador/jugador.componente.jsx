import React from 'react';

import Icon from '../../img/userphoto.svg';
import Ficha1 from '../../img/fichaUno.png';
import Ficha5 from '../../img/fichaCinco.png';

import './jugador.style.scss';

class Jugador extends React.Component{
    constructor(props){
        super(props);
        this.state={
            valorFicha:0,
            apuesta:0,
            montoActual:2000
        }
    }

   escogeFicha(number){
       this.setState({valorFicha:number},() => 
       console.log('cantidad',this.state));
       
    }
    aumentaApuesta(){
        const suma = this.state.apuesta + this.state.valorFicha;
        const resta = this.state.montoActual - this.state.valorFicha;
        if(resta < 0){
            return
        }else{

            this.setState({apuesta: suma, montoActual:resta},() => 
            console.log('cantidad',this.state));
        }
        
   }
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
                    <span className='Monto'>$ {this.state.montoActual}</span>
                </div>
                <div className='fichasCont'>
                    <img className='ficha' src={Ficha5} onClick={()=>this.escogeFicha(1)}/>
                    <img className='ficha' src={Ficha5} onClick={()=>this.escogeFicha(3)}/>
                    <img className='ficha' src={Ficha5} onClick={()=>this.escogeFicha(5)}/>
                    {/* <img className='ficha' src={Ficha5}/>
                    <img className='ficha' src={Ficha5}/> */}
                    {/* <img src={Ficha5}/>
                    <img src={Ficha5}/> */}
                </div>
                <div className='apuestaCont' onClick={()=>this.aumentaApuesta()}>

                    <span className='SubTitle'>APUESTA</span>
                    <span className='apuestaTotal'>$ {this.state.apuesta}</span>
                    
                </div>
            </div>

         </div>
        )
    }
};

export default Jugador;