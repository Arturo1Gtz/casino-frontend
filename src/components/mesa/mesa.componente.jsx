import React,{useState} from 'react';

import Croupier from '../croupier/croupier.componente';

import boton from '../../img/button.png';

function Mesa(){
    const [game, setGame] = useState(false);
    const espacioDisp = 15;
    return(
        <div>

        <Croupier></Croupier>
        </div>
        
        
    )

}

export default Mesa;