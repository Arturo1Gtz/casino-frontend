import React, { useEffect, useState } from 'react';

import {connect} from 'react-redux';
import {setCurrentRespuesta} from '../../redux/resCorrecta/resCorrec.actions';

import Preguntas from '../../files/preguntas.js';

import './cuestionario.style.scss';

function Cuestionario(props){

    const [preguntas,setPreguntas] = useState(Preguntas)
    const {seccPregunta, pregunta,setRespuesta} = props;
    const seccion = preguntas[seccPregunta];
    const question = seccion.preguntas[pregunta];
    const respuestaObj = question.respuestas.filter(res => res.correcta === true);
    const respuesta = respuestaObj[0].respuesta;

         // console.log('respuesta', respuesta[0].respuesta);

        return(<div className='cuestionario'>
                <div className='preguntaContainer'>
                    <span className='Seccion'> Categoria: {seccion.categoria}</span><br/>
                    <span className='Apuesta'>Respuesta: {respuesta}</span><br/><br/>
                    <span className='Pregunta'>{question.pregunta}</span>

                </div>
                <div className='respuestas'>
                    <span className='rsp' key={1}>{question.respuestas[0].respuesta}</span>
                    <span className='rsp' key={2}>{question.respuestas[1].respuesta}</span>
                    <span className='rsp' key={3}>{question.respuestas[2].respuesta}</span>
                    <span className='rsp' key={4}>{question.respuestas[3].respuesta}</span>
                </div>
            </div>)
    
};


export default Cuestionario;