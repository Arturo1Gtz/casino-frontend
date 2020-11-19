import React, { useState, useEffect } from 'react';
import Silla from '../silla/silla.component';
import Jugador from '../jugador/jugador.componente';

import './asientos.styles.scss';


const usuario = {
    nickname: "PedritoSola",
    avatar: "imagenshida",
    saldo: 0
};


const Asientos=(props)=>{
    const {sentarse,  replica, enJuego, juego, apostar, responder, revelado, end, socket, mesa, tipo} = props;

    //conexion a socket
    socket.emit('joinMesa', {tipo, mesa, usuario});

    const [player, setPlayer] = useState({nombre: 'arturo03', acumulado:10000, sentado: false, asiento:null})
    const [players, setPlayers] = useState([{nombre: 'juan02', acumulado:10000, apuesta: 50, respuesta: 'c', res: true},{nombre: 'eric05', acumulado:10000, apuesta: 50, respuesta: 'a', res: false}]);
    const jugadores = players.filter(jugador=>jugador.nombre !== player.nombre);
    // let sentado =  false;
    
    console.log('mesa' , players)
    // console.log( sentado, 'sentado')
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


    // Messaunctions 
    const sit =()=>{
        let newplayers = players;
        let newplayer = player;
        console.log('sit', newplayers, newplayer)
        if(newplayer.sentado === false){
            newplayer.asiento = players.length
            newplayers.push({nombre:player.nombre, acumulado:player.acumulado, apuesta:0, respuesta:null, res: null})
            newplayer.sentado = true;
            setPlayers(newplayers)
            setPlayer(newplayer)
            console.log('sit2', newplayers, newplayer)
            sentarse()
            
        }else{return}
    }

    const standUp =()=>{
        // console.log('stand')
        // const newPlayers = players;
        const newplayer = player;

        let newplayers = players.filter(function(jugador){
            if(jugador.nombre !== player.nombre){
                console.log(jugador)
                return jugador
            }else{
                return
            }
        });

        newplayer.sentado = false;
        setPlayers(newplayers)
        setPlayer(newplayer)
        console.log('stand', players, player)
        // const newJu
    }

    const answer = (y)=>{
        const newplayers = players;
        newplayers[player.asiento].respuesta = y;
        setPlayers(newplayers)
        // respuesta(player.asiento,y);
        if(players[player.asiento].respuesta === replica){
            players[player.asiento].res = true
        }else{ 
            players[player.asiento].res = false
        }
        responder(player.asiento, y)

        console.log('answer', players)
    }

    const apuesta = () =>{
        players[player.asiento].apuesta = bet;
    
        let apuestasTotal = 0;
        players.map(function(jugador){
            if(jugador.apuesta){
                apuestasTotal += 1;
            }
        } )
        if(apuestasTotal === players.length){
            game()
        }   
        console.log('asientos apuesta', players)
    }; 

    const pago = () =>{
        let newPlayers = players;
        let newJugador = player;

        if(players[player.asiento].res){
            newJugador.acumulado += players[player.asiento].apuesta;
        }else{
            newJugador.acumulado -= players[player.asiento].apuesta;

        }

        newPlayers.map(function(jugador){
            if(jugador.res){
                console.log(jugador.nombre,'gano');
                jugador.acumulado += (jugador.apuesta );
            }else{
                jugador.acumulado -= (jugador.apuesta );
                console.log(jugador.nombre,'perdio');
            }
        })
        setPlayer(newJugador)
        setPlayers(newPlayers);
        setMonto(player.acumulado);

    }

    const finalizar = () =>{
        let newPlayers = players;

        newPlayers[player.asiento].apuesta = 0;
        newPlayers[player.asiento].respuesta = null;
        newPlayers[player.asiento].res = null;
        
        // newPlayers.map(function(jugador){
        //     jugador.apuesta= 0;
        //     jugador.respuesta= null;
        //     jugador.res= null;
        // })

        setBet(0)
        setChips([[],[],[],[]])
        // setMonto(player.acumulado)
        end()
    }
    const game = ()=>{
        juego()
        setTimeout(()=>pago(),22000)
        setTimeout(()=>finalizar(),26000)
    };

    // useEffect(()=>{
    //     players.map(function(jugador){
    //         if(jugador.nombre == player.nombre){
    //             sentado = true;
    //         }

    //     })
    // })
    return(
        <div className={'asientos'}>
            <div className={'jugadoresCont'}>
                <div className={'Contenedor izq'}>
                    <div className={'asiento'}><Silla  align={'izq'} ident={jugadores[0]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>
                    <div className={'asiento'}><Silla  align={'izq'} ident={jugadores[1]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>
                    <div className={'asiento'}><Silla  align={'izq'} ident={jugadores[2]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>
                    
                </div>
                <div className={'Contenedor der'}>
                    <div className={'asiento'}><Silla align={'der'} ident={jugadores[3]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>
                    <div className={'asiento'}><Silla align={'der'} ident={jugadores[4]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>
                    <div className={'asiento'}><Silla align={'der'} ident={jugadores[5]} tomarAsiento={sit} revelacion= {revelado}></Silla></div>

                </div>
            </div>
        <div className={'jugadorCont'}>
            {player.sentado ?<Jugador levantarse={standUp} respuesta={players[player.asiento].respuesta} apuesta={players[player.asiento].apuesta} bet={bet} monto={montoActual} fichas={chips} aumentar={aumentaApuesta} clean={limpiar} onGame={enJuego} apostar= {apuesta} responder={answer}></Jugador>:<Silla align={'cabz'} ident={jugadores[6] } tomarAsiento={sit} revelacion= {revelado} ></Silla>}
            {/* {jugando?<span>diosmio</span>:<span>agarranosconfesados</span>} */}
        </div>
        </div>
    )
}

export default Asientos;