import React from 'react';

import CustomBoton from '../custom-boton/custom-boton.componente';

import Icon from '../../img/userphoto.svg';
import Ficha1 from '../../img/fichaUno.png';
import Ficha5 from '../../img/fichaCinco.png';

import './jugador.style.scss';

class Jugador extends React.Component{
    constructor(props){
        super(props);
        this.state={
            // valorFicha:0,
            apuesta:0,
            montoActual:200,
            cero:[],
            uno:[],
            dos:[],
            tres:[]
        }
    }
    render(){
        let juego = this.props.enJuego;
        console.log(juego)

    const aumentaApuesta=(a)=>{
        const suma = this.state.apuesta + a;
        const resta = this.state.montoActual - a;
        let variable = undefined;
        // let long = 0;
        
        switch(a){
            case 1: variable = this.state.cero; break;
            case 3: variable = this.state.uno;  break;
            case 5: variable = this.state.dos;  break;
            case 10:variable = this.state.tres; break;
        }

        if(resta < 0 ||variable.length == 8){
            return
        }else{
            variable.push(1);
            this.setState({apuesta: suma, montoActual:resta},() => 
            console.log('cantidad',this.state));
        }
    }
    const limpiar=()=>{
        const suma = this.state.apuesta + this.state.montoActual;
        this.setState({apuesta:0, montoActual:suma,cero:[],uno:[],dos:[],tres:[]},()=>
        console.log(this.state));
    }
        // console.log(fichas1)
    const apostar=()=>{
        console.log('Aposto')
        this.props.accion()
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
                    <span className='Monto'>$ {this.state.montoActual}</span>
                </div>
                <div className='fichasCont'>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={()=>aumentaApuesta(1)}/>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={()=>aumentaApuesta(3)}/>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={()=>aumentaApuesta(5)}/>
                    <img className='ficha' alt='ficha' src={Ficha5} onClick={()=>aumentaApuesta(10)}/>
                   
                </div>

                <div className='botonesCont'>
                    <CustomBoton type='button' onClick={limpiar} color='rojo' lugar='tarj' >limpiar</CustomBoton>
                    <CustomBoton color='amarillo' lugar='tarj' onClick={juego ? null : apostar}>apostar</CustomBoton>

                </div>

                <div className='apuestaCont' >
                    <div className='fichCont'>
                        <div className='fichas'>
                           {this.state.cero.map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                        <div className='fichas'>
                           {this.state.uno.map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                        <div className='fichas'>
                           {this.state.dos.map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                        <div className='fichas'>
                           {this.state.tres.map((value, index)=>{
                               return <img className='fichaPeq' style={{bottom:`${3 + index}%`}} alt='ficha' src={Ficha5}/>
                           })}
                        </div>
                    </div>
                    <span className='apuestaTotal'>$ {this.state.apuesta}</span>
                    
                </div>
            </div>

         </div>
        )
    }
};

export default Jugador;