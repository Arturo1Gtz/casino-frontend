import React from 'react';

import './cuestionario.style.scss';

function Cuestionario(props){
    return(
        <div className='cuestionario'>
            <div className='preguntaContainer'>
                <span className='Seccion'> Sección: {props.seccPregunta}</span><br/>
                <span className='Apuesta'>Apuesta: {props.apuesta}</span><br/><br/>
                <span className='Pregunta'> ¿Texto de Prueba?</span>

            </div>
            <div className='respuestas'>
                <span className='rsp' key={1}>A texto de prueba</span>
                <span className='rsp' key={2}>B texto de prueba</span>
                <span className='rsp' key={3}>C texto de prueba</span>
                <span className='rsp' key={4}>D texto de prueba</span>
            </div>
        </div>
    )
};

export default Cuestionario;