import React, { useState, useEffect } from 'react';

import Silla from '../silla/silla.component';
import Jugador from '../jugador/jugador.componente';
import Timer from '../timer/timer.component';
import Cuestionario from '../cuestionario/cuestionario.componente';

import { connect } from 'react-redux';
import './asientos.styles.scss';
import { firestore } from '../../firebase/firebase.utils';

import Izq from '../../img/silla-individual.png';
import Der from '../../img/silla-individual-der.png';
import Cntr from '../../img/silla-individual-cntr.png';

const Asientos = (props) => {
    const {currentUser, seccPregunta, pregunta, sentarse,  replica, enJuego, juego, apostar, enPregunta, responder, revelado, end, socket, mesa, tipo} = props;
    const updateUserRef = firestore.collection('user').doc(`${currentUser.id}`)
     

    //conexion a socket
    /*useEffect(() => {
        const nickname = currentUser.nickname;
        const avatar = currentUser.imgurl;
        const saldo = currentUser.credits;  
        const unsubscribeFromSocket = () =>  socket.emit('joinMesa', {tipo, mesa, nickname, avatar, saldo});
        console.log("Terreno", saldo, avatar, nickname)
        return() => unsubscribeFromSocket();
    }, [])*/
   
    
    var pleiers = {};
    socket.on("mesaPlayers", players => {
        console.log(players)
        pleiers = players;
    });
    
    const [player, setPlayer] = useState({nombre:currentUser.nickname, acumulado: currentUser.credits, sentado: false, asiento:null});
    const [players, setPlayers] = useState(pleiers);
    let jugadores= Object.entries(players).filter(jugador=>jugador[0] !== currentUser.nickname); 
    const [sentado,setSentado] = useState(false);
    // let sentado =  false;
    
    console.log('mesa' , players)
    
    //jugador state
    const[bet,setBet] = useState(0);
    const[montoActual, setMonto] = useState(player.acumulado);
    const[chips, setChips] = useState([[],[],[],[]]);

    //jugador funciones
    const aumentaApuesta=(a,row)=>{
        console.log('aumenta', a)
        const suma = bet + a
        const resta = montoActual - a;
        // let row = undefined;
        if(resta < 0 ||chips[row].length == 5){
            return
        }else{
            let newchips = chips;
            newchips[row].push(1);
            setChips(newchips)
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

    // MessaFunctions 
    const sit =()=>{
        let newplayers = players;
        if(!players[currentUser.nickname]){
            newplayers[currentUser.nickname]  = {acumulado:currentUser.credits, apuesta:0, respuesta:null, resultado: null};
            setPlayers(newplayers)
            setSentado(true)
            sentarse()
        }else{return}
    }

    const standUp =()=>{
        socket.emit("disconnect");

        let newplayers = players;
        delete newplayers[currentUser.nickname];
        setPlayers(newplayers)
        setSentado(false)
        console.log('stand', newplayers, players)
    }

    const answer = (y)=>{
        const newplayers = players;

        if(!newplayers[currentUser.nickname].respuesta){
            newplayers[currentUser.nickname].respuesta = y;
        }
       
        setPlayers(newplayers)
        if(players[currentUser.nickname].respuesta === replica){
            players[currentUser.nickname].resultado = true;
        }else{ 
            players[currentUser.nickname].resultado = false;
        }
        responder(player.asiento, y)
        console.log('answer', players)
    }

    const apuesta = () =>{
        let newPlayers = players;
        if(!newPlayers[currentUser.nickname].apuesta){

            newPlayers[currentUser.nickname].apuesta = bet;
        }
            
        let apuestasTotal = 0;
        for(var item in newPlayers){
            if(newPlayers[item].apuesta){
                apuestasTotal += 1;
            }
        }
        
        setPlayers(newPlayers);
        if(apuestasTotal === Object.keys(players).length){
            game()
        }   
        console.log('asientos apuesta', players, apuestasTotal, players.length)
    }; 

    const pago = () =>{
        let newPlayers = players;
        // let newJugador = player;

        // if(players[currentUser.nickname].resultado){
        //     newJugador.acumulado += players[player.asiento].apuesta;
        // }else{
        //     newJugador.acumulado -= players[player.asiento].apuesta;

        // }

        for(var jugador in newPlayers){
            if(newPlayers[jugador].resultado){
                console.log(jugador,'gano');
                newPlayers[jugador].acumulado += (newPlayers[jugador].apuesta);
            }else{
                newPlayers[jugador].acumulado -= (newPlayers[jugador].apuesta );
                console.log(newPlayers[jugador].nombre,'perdio');
            }
        }
        setPlayers(newPlayers);
        setMonto(players[currentUser.nickname].acumulado);

    }

    const finalizar = () =>{
        let newPlayers = players;

        newPlayers[currentUser.nickname].apuesta = 0;
        newPlayers[currentUser.nickname].respuesta = null;
        newPlayers[currentUser.nickname].resultado = null;
        
        // for(jugador in newPlayers){
        //     jugador.apuesta= 0;
        //     jugador.respuesta= null;
        //     jugador.res= null;
        // }

        setBet(0)
        setChips([[],[],[],[]])
        // setMonto(player.acumulado)
        try{
            updateUserRef.update({
                credits: montoActual
            })
            console.log("Creditos actualizados en la base de datos")
        } catch (error) {
            console.log(error)
        }
        end()
    }
    
    const checkApuestas = () => {
        let newPlayers = players;
        for(var jugador in newPlayers){
            if(newPlayers[jugador].apuesta === 0 && bet === 0){
                newPlayers[jugador].apuesta = 1000;
            }else if(newPlayers[jugador].apuesta === 0 && bet!=0){
                newPlayers[jugador].apuesta = bet;
            }
        }        
        setPlayers(newPlayers)
        game()
            
       
    }
    const game = ()=>{
        juego()
        setTimeout(()=>pago(),22000)
        setTimeout(()=>finalizar(),26000)
    };

    // useEffect(()=>{
    //     // let newjugadores = Object.entries(players);
    //     let jugadores= Object.entries(players).filter(jugador=>jugador[0] !== currentUser.nickname); 
        
    //     console.log(jugadores, 'JUGADORES', players,sentado)
    // },[pleiers]);

    return(
        <div className={'asientos'}>
            <div className={'asientos__jugadores'}>
                {/* Anuncio */}
                {enPregunta?
                    <div className={'asientos__jugadores__cuest'}>
                        <Cuestionario respondio={players[currentUser.nickname].respuesta} responder={answer} seccPregunta={seccPregunta} pregunta={pregunta} revelado={revelado} > </Cuestionario>

                    </div>
                :null}

                <div className={'timerCont'}>
                {
                    enJuego?null:

                    <div className={'anuncio'}>
                       <span>ESPERANDO APUESTAS</span>
                       <span class='anuncio__tomar'>No olvide tomar su lugar antes de que el contador termine.</span>
                       <div className={'anuncio__timer'}>
                        <Timer time={20} jugadores={players} accion= {checkApuestas}></Timer>
                        </div>
                    </div>
                }
                </div>

                <div className={'Contenedor izq'}>
                    <div className={'Contenedor__asiento'}><Silla  align={'Izq'} img={Izq} ident={jugadores[0]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>
                    <div className={'Contenedor__asiento'}><Silla  align={'Izq'} img={Izq} ident={jugadores[1]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>
                    <div className={'Contenedor__asiento'}><Silla  align={'Izq'} img={Izq} ident={jugadores[2]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>
                    
                </div>

                <div className={'Contenedor cntr'}>

                    <div className={'Contenedor__anuncio'}>
                         {/* {true?
                         true? */}
                    {sentado && revelado ?
                         players[currentUser.nickname].resultado ?
                            <span>¡ GANASTE !</span>
                        :
                            <span>PERDISTE</span>
                        
                        : null}
                    </div>
                    
                </div>

                <div className={'Contenedor der'}>
                    <div className={'Contenedor__asiento'}><Silla align={'Der'} img={Der} ident={jugadores[3]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>
                    <div className={'Contenedor__asiento'}><Silla align={'Der'} img={Der} ident={jugadores[4]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>
                    <div className={'Contenedor__asiento'}><Silla align={'Der'} img={Der} ident={jugadores[5]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>

                </div>
            </div>
            <div className={'jugadorCont'}>
                {sentado?<Jugador levantarse={standUp}  apuesta={players[currentUser.nickname].apuesta} bet={bet} monto={montoActual} fichas={chips} aumentar={aumentaApuesta} clean={limpiar} onGame={enJuego} apostar= {apuesta}  avatar={currentUser.imgurl}></Jugador>:<Silla align={'Cntr'} img={Cntr} ident={jugadores[6] } tomarAsiento={sit} revelacion= {revelado} ></Silla>}
                {/* {jugando?<span>diosmio</span>:<span>agarranosconfesados</span>} */}
            </div>
        </div>
        
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(
    mapStateToProps,
    null
)(Asientos);