import React, {useEffect, useState} from 'react';

import './mini-croupier.style.scss';
import MesaFondo from '../../img/mesa-de-inicio.png';
import Ocup from '../../img/lugar-ocupado.png';
import Disp from '../../img/lugar-disponible.png';
import Sillon from '../../img/silla-individual.png';
import SillonDer from '../../img/silla-individual-der.png';
import SillonCntr from '../../img/silla-individual-cntr.png';
import io from 'socket.io-client'

const socket = io(process.env.NODE_ENV === "production" ? "/" : "http://localhost:8081");

const MiniCroupier =(props)=>{
    const [jugadores, setJugadores] = useState([]);
    const {num} = props;
    // socket.emit('getMesasPlayers');
    // socket.on('mesasPlayers', players => {
    //     setJugadores({jugadores: players.filter(jugador => jugador.mesa === num)}, () => console.log("pepinos", jugadores));
    // })
    // var arr = [];
    // if(jugadores === undefined){
    //     console.log('Sin jugadores')
    // } else {
    //     arr = jugadores;
    // }
    const arr = []
    
    return(
        <div className={'mini'}>

            <div className={'mini__num'}>
                <span className={'mini__num__span'}>{num}</span>
            </div>
            {/* <span>mini croupier</span> */}
            <div className={'mini__front'}>
                <div className={'mini__front__sillas'}>
                    <img src={`${arr[0]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                    <img src={`${arr[1]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                    <img src={`${arr[2]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                </div>
                <div className={'mini__front__center'}>
                    <img src={MesaFondo} alt ='fondoJuego' className={'mini__front__center__imgBg'}/> 
                    <img src={`${arr[6]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__center__img`} />
                        
                </div>
                <div className={'mini__front__sillas'}>
                    <img src={`${arr[3]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                    <img src={`${arr[4]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                    <img src={`${arr[5]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                </div>
            </div>

            {/* fondo con sillas */}
            <div className={'mini__fondo'}>
                <div className={'mini__fondo__sillas'}>
                    <img src={Sillon} alt ='img_silla' className={`mini__fondo__sillas__img`} />
                    <img src={Sillon} alt ='img_silla' className={`mini__fondo__sillas__img`} />
                    <img src={Sillon} alt ='img_silla' className={`mini__fondo__sillas__img`} />
                </div>
                <div className={'mini__fondo__sillas'}>
                    <img src={MesaFondo} alt ='fondoJuego' className={'mini__fondo__sillas__imgBg'}/> 
                    <img src={SillonCntr} alt ='img_silla' className={`mini__fondo__sillas__imgCntr`} />
                        
                </div>
                <div className={'mini__fondo__sillas'}>
                    <img src={SillonDer} alt ='img_silla' className={`mini__fondo__sillas__img`} />
                    <img src={SillonDer} alt ='img_silla' className={`mini__fondo__sillas__img`} />
                    <img src={SillonDer} alt ='img_silla' className={`mini__fondo__sillas__img`} />
                </div>
            </div>

        </div>
    )
}

export default MiniCroupier;