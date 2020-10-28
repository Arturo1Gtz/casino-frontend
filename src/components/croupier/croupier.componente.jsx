import React from 'react' ;

import Ruleta from '../ruleta/ruleta.componente';
import Cuestionario from '../cuestionario/cuestionario.componente';
import Jugador from '../jugador/jugador.componente';
import Chat from '../chat/chat.component';

import boton from '../../img/button.png';

import './croupier.style.scss'
import io from 'socket.io-client'
const socket = io("http://localhost:3001");

const tipo = "player";
const mesa = 1;

socket.emit('joinMesa', {tipo, mesa});

socket.on('message', message => {
    console.log(message);
});

class Croupier extends React.Component{
    
     
    constructor (props){
        super(props);
        this.state ={
            vueltasEx: 0,
            vueltasIn: 0,
            onGame: false,
            onGiro:false,
            onPregunta:false,
            pregunta: 0,
            seccIn: 6,
            seccEx:4,
            acSeccIn: 0,
            acSeccEx:0
        }
    }
    render(){
        const {vueltasEx, vueltasIn,onGame,onGiro,seccEx,seccIn} = this.state;
        
        const calcVueltas=()=>{
            this.setState({onGame:true, onGiro:true,  vueltasEx:Math.random() * (25- 10) + 10 ,vueltasIn:Math.random() * (25- 10) + 10},() => 
            console.log('vueltas',this.state));
        }
        const sinGiro =()=>{
            const actualDegE = this.state.vueltasEx - Math.floor(this.state.vueltasEx);
            const actualDegI = this.state.vueltasIn - Math.floor(this.state.vueltasIn);

            const actualSeccEx = Math.floor(actualDegE*seccEx);
            const actualSeccIn = Math.floor(actualDegI*seccIn);

            this.setState({onGiro: false,  onPregunta:true, vueltasEx: actualDegE, vueltasIn: actualDegI, acSeccEx: actualSeccEx, acSeccIn: actualSeccIn, pregunta:  Math.floor(Math.random() * (4))},() => 
            console.log('simGiro',this.state));
            

        }
        const endGame=()=>{
            this.setState({onPregunta:false, onGame:false},()=>
            console.log('endgame',this.state));
        }
        
        function juego(){
            calcVueltas();
            setTimeout(sinGiro,7000);
            setTimeout(endGame,17000);
        }  

        return(
            <div className={'croupier'}>
                <Chat />
                <div className={'juego'}>
                    <div className='ruletaCont'>
                        <Ruleta  vueltasE={vueltasEx} vueltasI={vueltasIn} giro={onGiro}></Ruleta>

                    </div>
                    <div className='cuestionarioCont'>
                        {this.state.onPregunta?
                        <Cuestionario seccPregunta={this.state.acSeccEx} apuesta={this.state.acSeccIn} pregunta={this.state.pregunta}> </Cuestionario>
                        :null}

                    </div>
                    <div className='jugadorCont'>
                        <Jugador accion={juego} enJuego={this.state.onGame}></Jugador>
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