import React, { useState } from 'react';
import Silla from '../silla/silla.component';
import Jugador from '../jugador/jugador.componente';

import './asientos.styles.scss';

function Asientos(props){

    const [player, setPlayer] = useState({nombre: 'arturo03', acumulado:10000, sentado: false, asiento:null})
    const [players, sePlayers] = useState([{nombre: 'juan02', acumulado:10000, apuesta: 50, resp: 'c', res: null},{nombre: 'eric05', acumulado:10000, apuesta: 50, resp: 'a', res: null}]);
    const jugadores = players.filter(jugador=>jugador.nombre !== player.nombre);
    const {sentarse,  replica, enJuego, juego} = props;


    const sit =()=>{
        console.log(player)
        if(player.sentado === false){
            player.asiento = players.length
            players.push({nombre:player.nombre, acumulado:player.acumulado, apuesta:0, resp:null})
            player.sentado = true;
            console.log(players)
            sentarse()

        }else{return}
    }
    const answer = (y)=>{
        players[player.asiento].respuesta = y;

        // respuesta(player.asiento,y);
        console.log('answer',players)
    }
    const apostar = (bet) =>{
        players[player.asiento].apuesta = bet;
        // apuesta(player.asiento,bet)
        console.log('asientos apuesta', players)

        let apuestasTotal = 0;
        players.map(function(jugador){
            if(jugador.apuesta){
                apuestasTotal += 1;
            }
        } )
        if(apuestasTotal === players.length){
            game()
        }
    }
    const pago = () =>{
        players.map(function(jugador){
            console.log(jugador.nombre, replica)
            if(jugador.apuesta === replica){
                console.log(jugador.nombre,'gano')
                jugador.acumulado += (jugador.apuesta * 2);
            }else{
                console.log(jugador.nombre,'perdio');
            }
        })
    }
    const game = ()=>{
        juego()
        
        // setTimeout(()=>pago(),22000)
    }
    return(
        <div className={'asientos'}>
            <div className={'jugadoresCont'}>
                <div className={'Contenedor izq'}>
                    <div className={'asiento'}><Silla  align={'izq'} ident={jugadores[0]} tomarAsiento={sit} ></Silla></div>
                    <div className={'asiento'}><Silla  align={'izq'} ident={jugadores[1]} tomarAsiento={sit}></Silla></div>
                    <div className={'asiento'}><Silla  align={'izq'} ident={jugadores[2]} tomarAsiento={sit}></Silla></div>
                    
                </div>
                <div className={'Contenedor der'}>
                    <div className={'asiento'}><Silla align={'der'} ident={jugadores[3]} tomarAsiento={sit}></Silla></div>
                    <div className={'asiento'}><Silla align={'der'} ident={jugadores[4]} tomarAsiento={sit}></Silla></div>
                    <div className={'asiento'}><Silla align={'der'} ident={jugadores[5]} tomarAsiento={sit}></Silla></div>

                </div>
            </div>
        <div className={'jugadorCont'}>
            {player.sentado ?<Jugador jugador={players[player.asiento]} onGame={enJuego} apostar= {apostar} responder={answer}></Jugador>:<Silla align={'cabz'} ident={jugadores[6]} tomarAsiento={sit}></Silla>}
            {/* {jugando?<span>diosmio</span>:<span>agarranosconfesados</span>} */}
        </div>
        </div>
    )
}

export default Asientos;