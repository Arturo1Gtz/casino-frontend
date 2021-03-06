import React, {useEffect} from 'react' ;

import Ruleta from '../ruleta/ruleta.componente';
import Cuestionario from '../cuestionario/cuestionario.componente';
import Chat from '../chat/chat.component';
import Asientos from '../asientos/asientos.componente';
import Timer from '../timer/timer.component';
// import Mesa from '../mesa/mesa.componente';
// import Jugador from '../jugador/jugador.componente';

import boton from '../../img/button.png';
import './croupier.style.scss'
import MesaFondo from '../../img/mesa-de-inicio-mitad.png';
import Mesa from '../../img/mesa-de-inicio.png';
import Preguntas from '../../files/preguntas.js';

import io from 'socket.io-client'
import { connect } from 'react-redux';
const socket = io(process.env.NODE_ENV === "production" ? "/" : "http://localhost:8081");

const tipo = "player";
var mesa = "";


class Croupier extends React.Component{
    
    constructor (props){
        super(props);
        this.state ={
            
            onGame: false,
            onGiro:false,
            onPregunta:false,
            onRevelacion:false,
            vueltasEx: 0,
            vueltasIn: 0,
            pregunta: 0,
            seccIn: 6,
            seccEx:4,
            acSeccIn: 0,
            acSeccEx:0,
            respuesta:'', 
            jugadores:[{ocupado:true, apuesta: 50, respuesta:'c',resultado:true},{ocupado:true, apuesta: 50, respuesta: 'a',resultado:false}],
            nickname:'',
            avatar:'',
            saldo: 0
        }
        mesa = this.props.match.params.mesa;
    }

    
    componentDidMount() {
        const { currentUser} = this.props;
        this.state.nickname = currentUser.nickname;
        this.state.avatar = currentUser.imgurl;
        this.state.saldo = currentUser.credits;
        const nickname = this.state.nickname;
        const avatar = this.state.avatar;
        const saldo = this.state.saldo;
        socket.emit('joinMesa', {tipo, mesa , nickname, avatar, saldo});

    }

    componentWillUnmount() {
        socket.emit('disconnect');
        console.log("Component unmount")
    }
    
    render(){
        const {onGame, onGiro, onPregunta, onRevelacion, vueltasEx, vueltasIn,seccEx,seccIn , acSeccEx, acSeccIn, jugadores, pregunta, respuesta, asiento, respuestasArreglo } = this.state;

        const giro = () =>{
            calcVueltas();
            setTimeout(sinGiro,7000);
        }
        const calcVueltas=()=>{
            socket.emit("vueltas");
            socket.on("vext", vext => {
                console.log(vext);
                this.setState({vueltasEx:vext},() => console.log('calamares',this.state));
            });

            socket.on("vint", vint => {
                console.log(vint);
                this.setState({vueltasIn:vint},() => console.log('calamares',this.state));
            });


            this.setState({onGame:true, onGiro:true}
             ,() => console.log('vueltas',this.state)

            
        );}
        const sinGiro =()=>{
            const actualDegE = this.state.vueltasEx - Math.floor(this.state.vueltasEx);
            const actualDegI = this.state.vueltasIn - Math.floor(this.state.vueltasIn);

            this.setState({onGiro: false, vueltasEx: actualDegE, vueltasIn: actualDegI}
            ,() => console.log('simGiro',this.state)
            
        );}

        const seccion = () =>{
            const actualSeccEx = Math.floor(this.state.vueltasEx * this.state.seccEx);
            const actualSeccIn = Math.floor(this.state.vueltasIn * this.state.seccIn);
            const preguntaNumero= Math.floor(Math.random() * (4))
            
            const seccion = Preguntas[actualSeccEx];
            const questionObj = seccion.preguntas[preguntaNumero];
            const respuestas = questionObj.respuestas;
            const respuestaObj = questionObj.respuestas.filter(res => res.correcta === true);
            const answer = respuestaObj[0].respuesta; 

            this.setState({acSeccEx:actualSeccEx, acSeccIn:actualSeccIn, pregunta: preguntaNumero, respuesta:answer}
                ,()=>console.log('cuestionario', this.state)
                );
                
        }
        const showQuestion=()=>{
            this.setState({onPregunta: true});
        }

        const revelacion =()=>{
            this.setState({onRevelacion:true})
        }

        const tomarAsiento=()=>{
            // console.log(respuestaCorrecta)
                let newJugadores = [...jugadores];
                newJugadores.push({ocupado:true, apuesta: 0, respuesta: undefined, resultado:undefined});
                
                // setAsiento(newJugadores.length);
                this.setState({jugadores:newJugadores}
                    // ,()=>console.log('tomarAsiento', this.state)
                )
            
        }
        const apostar =(i, b)=>{
            jugadores[i].apuesta = b
            // console.log('apuesta', this.state)        
            // let apuestasTotal = 0;
            // jugadores.map(function(jugador){
            //     if(jugador.apuesta){
            //         apuestasTotal += 1;
            //     }
            // } )
            // if(apuestasTotal === jugadores.length){
            //     juego()
            // }   
        }

        const responder = (x) =>{
            // console.log('respuesta', this.state.respuesta)
            const newjugadores = [...jugadores];

            newjugadores[0].respuesta = x;
            if(x === this.state.respuesta){
                newjugadores[0].resultado = true
            }else{
                newjugadores[0].resultado = false
            }
            this.setState({jugadores:newjugadores})

            // console.log('respuesta', this.state)
        }

        const endGame=()=>{
            this.setState({onGame:false, onPregunta:false, onRevelacion:false}
                ,()=> console.log('endgame',this.state.jugadores)
        );}
        
        const juego=()=>{
            giro();
            setTimeout(()=>{seccion()},7001)
            setTimeout(()=>{showQuestion()},7003)
            setTimeout(()=>{revelacion()},22000)
        }  

        return(
            
            <div className={'croupier'}>
                <div className={'croupier__chat'}>
                    <Chat socket={socket} tipo={tipo} mesa={mesa} />
                </div>
                <div className={'juego'}>                    
                    <div className={'ruletaCont'}>
                        <div className={'ruletaCont__elem'}>
                            <Ruleta vueltasE={vueltasEx} vueltasI={vueltasIn} giro={onGiro}></Ruleta>
                        </div>
                        <div className={'ruletaCont__elem'}>
                            <br/>
                            <br/>
                            <span >{mesa}</span>
                        </div>
                    </div>
                    <div className='asientosCont'>
                        <Asientos juego={juego} end={endGame} seccPregunta={acSeccEx} pregunta={pregunta} replica= {respuesta} sentarse={tomarAsiento}  apostar={apostar} responder={responder} enJuego={onGame} enPregunta={onPregunta} revelado={onRevelacion} socket={socket} mesa={mesa} tipo={tipo}></Asientos>
                    </div>
                    <div className={'juego__fondo'}>                    
                        <img src={Mesa} alt ='fondoJuego' className={'juego__fondo__img'} /> 
                    </div>
                    
                </div>
                {/* {onGame ? null:<img src={boton} alt='boton' className='boton' onClick={juego}/>} */}
            </div> 
        )
    }

};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(
    mapStateToProps,
    null
)(Croupier);