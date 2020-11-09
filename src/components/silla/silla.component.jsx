import React from 'react';

import './silla.style.scss';
// import Icon from '../../img/userphoto.svg';
import Ocup from '../../img/lugar-ocupado.png';
import Disp from '../../img/lugar-disponible.png';
import Sillon from '../../img/silla-individual.png';


function Silla(props){
    var ocupado = props.ident;
    // console.log('silla', props, ocupado)
    
    
    if(ocupado){
        // console.log('inside if', ocupado, props)
        var {nombre, acumulado, apuesta} = props.ident;
        nombre.toUpperCase()
        
    }else{
        var nombre = undefined;
        var apuesta = undefined;
        var acumulado = undefined;
    }
    // console.log('ident', props.ident)
    
    return(
        <div className={`silla ${props.align} ${ocupado?null:'ocupado'} `}>
            <div className={'imgContainer'}>{ocupado?
                <img src={Ocup} alt ='img_silla' className='Img' />
                :<img src={Disp} alt ='img_silla' className='Img' onClick={() => props.tomarAsiento()}/>
            }</div>
            
            <div className={`datosContainer`} >
                <span className={`datosContainer__nombre`}>{nombre}</span>
                <span className={`datosContainer__subtitle`}>PUNTOS ACUMULADOS</span>
                <span className={`datosContainer__acumulado`}>{acumulado}</span>
                <span className={`datosContainer__subtitle`}>APUESTA ACTUAL</span>
                <span className={`datosContainer__apuesta`}>{apuesta}</span>
            </div>
            <div className={'silla__fondo'}>
                <img src={Sillon} alt ='img_silla' className='silla__fondo__Img' />
                
            </div>
        </div>
    )
};

export default Silla;