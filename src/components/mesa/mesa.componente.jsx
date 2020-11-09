import React, {useState} from 'react';

import Silla from '../silla/silla.component';
import Jugador from '../jugador/jugador.componente';

import './mesa.style.scss';

function Mesa (props){
    console.log('mesa', props)

    console.log('MesaRes', props.respuestaCorr)

    const newPlayer = {nombre: 'arturo1',acumulado:1111, apuesta:0, resp: undefined, res: null};
    
    const [ asiento, setAsiento] = useState(2);
    const [jugadores, setJug] = useState([{apuesta: 6, resp: 'c', res: null},{nombre: 'eric05', acumulado:10000, apuesta: 7, resp: 'a', res: null}]);
    
    var respuestaCorrecta = props.respuestaCorr;
    let apostaron = 0;
    //filter.length encuentra si el jugador ya esta dentro del arreglo
    const jugando = (jugadores.filter(jugador => jugador.nombre === newPlayer.nombre)).length;
    
    // //players se convierte en Array con/sin el Jugad-*or
    // let players = undefined;
    // if(jugando){
    //     players =  jugadores.filter(jugador => jugador.nombre !== newPlayer.nombre);
    // }else{
    //     players = jugadores; B
    // }
    
    //funcion para setear el array de estado 
    let tomarAsiento=()=>{
        console.log(respuestaCorrecta)
        if(jugando){return}else{
            let newJugadores = [...jugadores];

            setAsiento(newJugadores.length);
            
            newJugadores.push(newPlayer);
            setJug(newJugadores)
            console.log('tomarAsiento', props)
        }
    }
    
    //obtiene los valores del componente jugador y actualiza el array de jugadoresa la apuesta 
    let apostar=(apuesta,montoactual)=>{
        
        // let newJugadores = [...jugadores];
        // newJugadores.map(function(jugador){ if(jugador.nombre === newPlayer.nombre){ jugador.apuesta = apuesta; jugador.acumulado = montoactual }})
        // setJug(newJugadores)

        console.log('apuesta', props)
        jugadores[asiento].apuesta = apuesta;
        jugadores[asiento].acumulado = montoactual;

        jugadores.map(jugador => jugador.apuesta ? apostaron += 1 : null)
        if(apostaron === jugadores.length && apostaron > 0){
            game()
        }

    }

    let responder=(answer)=>{
        console.log('respondio', props)

        if(jugadores[asiento].resp){
            return;
        }else{
            jugadores[asiento].resp = answer;
        }
    }

    let resultado = ()=>{
        console.log(props)


    }
    
    let game=()=>{
        console.log('game1', props)
        props.iniciarJuego();
        console.log('game2', props)

        setTimeout(gameOff, 22000);

        
    }
    
    let gameOff=()=>{
        jugadores.map(function(jugador){
            jugador.apuesta = 0;
            jugador.resp = undefined;
            jugador.res = undefined;
        })
        props.finJuego();
        console.log('fin',jugadores)
    }
    // resultados()

    // useEffect(()=>{
    //     console.log(jugadores)
    // })

    return(
        <div className={'mesa'}>
            {/* <div className={'jugadoresCont'}>
                <div className={'Contenedor izq'}>
                    <div className={'asiento'}><Silla  align={'izq'} ident={players[0]} asiento={tomarAsiento} ></Silla></div>
                    <div className={'asiento'}><Silla  align={'izq'} ident={players[1]} asiento={tomarAsiento}></Silla></div>
                    <div className={'asiento'}><Silla  align={'izq'} ident={players[2]} asiento={tomarAsiento}></Silla></div>
                    
                </div>
                <div className={'Contenedor der'}>
                    <div className={'asiento'}><Silla align={'der'} ident={players[3]} asiento={tomarAsiento}></Silla></div>
                    <div className={'asiento'}><Silla align={'der'} ident={players[4]} asiento={tomarAsiento}></Silla></div>
                    <div className={'asiento'}><Silla align={'der'} ident={players[5]} asiento={tomarAsiento}></Silla></div>

                </div>
            </div>

            <div className={'jugadorCont'}>
                {jugando?<Jugador enJuego={props.enjuego} ident={jugadores[asiento]} apostar= {apostar} responder={responder}></Jugador>:<Silla align={'cabz'} ident={players[6]} asiento={tomarAsiento}></Silla>}
                {/* {jugando?<span>diosmio</span>:<span>agarranosconfesados</span>} */}
            </div> */}
        </div>        
    )
};

export default Mesa
