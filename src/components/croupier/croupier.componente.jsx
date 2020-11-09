import React from 'react' ;

import Ruleta from '../ruleta/ruleta.componente';
import Cuestionario from '../cuestionario/cuestionario.componente';
import Chat from '../chat/chat.component';
import Asientos from '../asientos/asientos.componente';
// import Mesa from '../mesa/mesa.componente';
// import Jugador from '../jugador/jugador.componente';

// import boton from '../../img/button.png';
import './croupier.style.scss'
import MesaFondo from '../../img/mesa-de-inicio.png';
import Preguntas from '../../files/preguntas.js';

import io from 'socket.io-client'
const socket = io("http://localhost:3001");

const tipo = "player";
const mesa = 1;

socket.emit('joinMesa', {tipo, mesa});

socket.on('message', message => {
    console.log(message);
});

export function croupierRuleta(){

}

class Croupier extends React.Component{
    
    constructor (props){
        super(props);
        this.state ={
            
            onGame: false,
            onGiro:false,
            onPregunta:false,
            vueltasEx: 0,
            vueltasIn: 0,
            pregunta: 0,
            seccIn: 6,
            seccEx:4,
            acSeccIn: 0,
            acSeccEx:0,
            respuesta:'', 
            jugadores:[{ocupado:true, apuesta: 50, respuesta:'b'},{ocupado:true, apuesta: 50, respuesta: 'c'}]
        }
    }
    
    render(){
        const {onGame, onGiro, onPregunta, vueltasEx, vueltasIn,seccEx,seccIn, jugadores, respuesta,asiento} = this.state;
        
        
        
        const giro = () =>{
            calcVueltas();
            setTimeout(sinGiro,7000);
        }
        const calcVueltas=()=>{
            this.setState({onGame:true, onGiro:true,  vueltasEx:Math.random() * (25- 10) + 10 ,vueltasIn:Math.random() * (25- 10) + 10}
            // ,() => console.log('vueltas',this.state)
        );}
        const sinGiro =()=>{
            const actualDegE = this.state.vueltasEx - Math.floor(this.state.vueltasEx);
            const actualDegI = this.state.vueltasIn - Math.floor(this.state.vueltasIn);

            this.setState({onGiro: false, vueltasEx: actualDegE, vueltasIn: actualDegI}
            // ,() => console.log('simGiro',this.state)
            
        );}

        const seccion = () =>{
            const actualSeccEx = Math.floor(vueltasEx*seccEx);
            const actualSeccIn = Math.floor(vueltasIn*seccIn);
            const preguntaNumero= Math.floor(Math.random() * (4))
            
            const seccion = Preguntas[actualSeccEx];
            const questionObj = seccion.preguntas[preguntaNumero];
            const respuestaObj = questionObj.respuestas.filter(res => res.correcta === true);
            const answer = respuestaObj[0].respuesta;

            this.setState({onPregunta: true,acSeccEx:actualSeccEx, acSeccIn:actualSeccIn, pregunta: preguntaNumero, respuesta:answer}
                ,()=>console.log('cuestionario', this.state.respuesta))
                
        }
        const revelacion =()=>{
            console.log('respuesta', respuesta)
        }

        const tomarAsiento=()=>{
            // console.log(respuestaCorrecta)
                let newJugadores = [...jugadores];
                newJugadores.push({ocupado:true, apuesta: 0, respuesta: undefined});
                
                // setAsiento(newJugadores.length);
                this.setState({jugadores:newJugadores}
                    ,()=>console.log('tomarAsiento', this.state)
                )
            
        }
        // const apostar =(i, b)=>{
        //     jugadores[i].apuesta = b
        //     // console.log('apuesta', this.state)           
        // }

        // const responder = (i,x) =>{
        //     jugadores[i].respuesta = x;
        //     console.log('respuesta')
        // }

        const endGame=()=>{
            this.setState({onPregunta:false, onGame:false}
                ,()=> console.log('endgame',this.state.jugadores)
        );}
        
        const juego=()=>{
            giro();
            setTimeout(()=>seccion(), 7000 )
            console.log('inmediato',this.state.respuesta)
            setTimeout(() => {
                // revelacion()
                console.log('espera7s', this.state.respuesta)
            }, 7500);

            // setTimeout(endGame,10000);
        }  

        return(
            <div className={'croupier'}>
                <div className={'chatCont'}>
                    <Chat />

                </div>

                <div className={'juego'}>
                    <div className='ruletaCont'>
                        <Ruleta  vueltasE={vueltasEx} vueltasI={vueltasIn} giro={onGiro}></Ruleta>

                    </div>
                        {onPregunta?
                        <div className='cuestionarioCont'>
                            <Cuestionario seccPregunta={this.state.acSeccEx} apuesta={this.state.acSeccIn} pregunta={this.state.pregunta} > </Cuestionario>

                        </div>
                        :null}

                    <div className='asientosCont'>
                        <Asientos juego={juego} replica= {respuesta} sentarse={tomarAsiento}  enJuego={onGame}></Asientos>
                    </div>


                    <div className={'juego__fondo'}>                    
                        <img src={MesaFondo} alt ='fondoJuego' className='juego__fondo__Img' /> 

                    </div>
                </div>
                {/* {onGame ? null:
                <img src={boton} alt='boton' className='boton' onClick={juego}/>
                } */}
            </div> 
        )
    }

};

export default Croupier;