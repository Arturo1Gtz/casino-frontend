import React, {useState, useEffect} from 'react';

import './silla.style.scss';
// import Icon from '../../img/userphoto.svg';
import Ocup from '../../img/lugar-ocupado.png';
import Disp from '../../img/lugar-disponible.png';
import Izq from '../../img/silla-individual.png';
import Der from '../../img/silla-individual-der.png';
import Cntr from '../../img/silla-individual-cntr.png';


function Silla(props){
    var {align, tomarAsiento, ident, img, revelacion} = props;
    var ocupado = ident;

    const [color, setColor] = useState('rojo');
    // console.log('silla', props, ocupado)
    
    if(ocupado){
        // console.log('inside if', ocupado, props)
        // var {nombre, acumulado, apuesta, res} = ident;
        var nombre = ident[0]
        var {acumulado, apuesta, resultado} = ident[1]
        nombre.toUpperCase()
        
    }else{
        var nombre = undefined;
        var apuesta = undefined;
        var acumulado = undefined;
        var resultado = undefined;
    }
    // console.log('ident', props.ident)
    useEffect(()=>{
        if(resultado){
            setColor('verde');
        }
    }
    )
    
    return(
        <div className={`silla ${align} ${ocupado?null:'ocupado'} `}>
            <div className={'imgContainer'}>
            {ocupado?
                <img src={Ocup} alt ='img_silla' className={`Img ${revelacion?color:null}`} />
                :<img src={Disp} alt ='img_silla' className={`Img`} onClick={tomarAsiento}/>
            }
            </div>
            
            <div className={`datosContainer`} >
                <span className={`datosContainer__nombre`}>{nombre}</span>
                <span className={`datosContainer__subtitle`}>PUNTOS ACUMULADOS</span>
                <span className={`datosContainer__acumulado`}>{acumulado}</span>
                <span className={`datosContainer__subtitle`}>APUESTA ACTUAL</span>
                <span className={`datosContainer__apuesta`}>{apuesta}</span>
            </div>
            <div className={'silla__fondo'}>
                <img src={img} alt ='img_silla' className='silla__fondo__Img' />
                
            </div>
        </div>
    )
};

export default Silla;