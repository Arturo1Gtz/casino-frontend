import React from 'react';

import Croupier from '../../components/croupier/croupier.componente';
import {useParams} from 'react-router-dom';
import './roulette.style.css';

const RoulettePage =()=>{
    const { mesa } = useParams();
    return(
        <div className='ruletaPagina' >
            <Croupier table={mesa}></Croupier>
        </div>
    )

};

export default RoulettePage;