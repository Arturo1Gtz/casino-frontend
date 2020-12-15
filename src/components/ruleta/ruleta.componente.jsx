import React from 'react';

import styled from 'styled-components';

// import ruleta from '../../img/círculo.png';
// import flecha from '../../img/triángulo.png';
import fondo from '../../img/ruletaFondo.png';
import ruletaEx from '../../img/ruletaExterna.png';
import ruletaIn from '../../img/ruletaInterna.png';
import selector from '../../img/ruletaSelector.png';

import './ruleta.style.scss';

const Circulo = styled.img`
        position: absolute;
        width: 300px;
        transform:rotate(${props => props.vueltas}turn);
        transition: transform ${ props => props.giro ? `${props.tamano ? 5 : 7}s ease-out`: 'none'};
        @media only screen and (min-width:500px){
            width: 400px
        }
        @media only screen and (min-width:1200px){
            width: 450px
        }
        `;


function Ruleta(props) {
    return (   
        <div className='ruleta'>    
            <img src={fondo} alt='fondo' className='ruleta__selector'/>
            <Circulo src={ruletaEx} vueltas={props.vueltasE} giro={props.giro} tamano={true}/>
            <Circulo src={ruletaIn} vueltas={props.vueltasI} giro={props.giro}/>
            <img src={selector} alt='selector' className='ruleta__selector'/>

            
        </div>
    )
};

export default Ruleta;