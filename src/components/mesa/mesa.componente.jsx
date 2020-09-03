import React,{useState} from 'react';

import Croupier from '../croupier/croupier.componente';

import boton from '../../img/button.png';

function Mesa(){
    const [game, setGame] = useState(false);
    return(
        <div>

        <Croupier></Croupier>
        </div>
        
        
    )

}

export default Mesa;