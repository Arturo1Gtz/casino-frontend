import React,{useState, useEffect} from 'react';
import io from "socket.io-client";

import Croupier from '../croupier/croupier.componente';

import boton from '../../img/button.png';
const socket = io("http;//localhost:3016", {
    transports: ["websocket","polling"]
});


function Mesa(){
    const [game, setGame] = useState(false);

    return(
        <div>

        <Croupier></Croupier>
        </div>
        
        
    )

}

export default Mesa;