import React, { useEffect, useState } from 'react';

import Preguntas from '../../files/preguntas.js';

import './cuestionario.style.scss';

function Cuestionario(props){

    const {seccPregunta, pregunta,revelado} = props;
    const [preguntas,setPreguntas] = useState(Preguntas)

    const seccion = preguntas[seccPregunta];
    const question = seccion.preguntas[pregunta];
    const respuestaObj = question.respuestas.filter(res => res.correcta === true);
    const respuesta = respuestaObj[0].respuesta;
    const [a,setA] = useState('rojo') ;
    const [b,setB] = useState('rojo') ;
    const [c,setC] = useState('rojo') ;
    const [d,setD] = useState('rojo') ;

    useEffect(()=>{
            switch(respuesta){
                case 'a': setA('verde'); break;
                case 'b': setB('verde'); break;
                case 'c': setC('verde'); break;
                case 'd': setD('verde'); break;
                default: break;
            }
        }
    )

        return(<div className='cuestionario'>
                <div className='preguntaContainer'>
                    <span className='Seccion'> Categoria: {seccion.categoria}</span><br/>
                    <span className='Apuesta'>Respuesta: {respuesta}</span><br/><br/>
                    <span className='Pregunta'>{question.pregunta}</span>
                </div>
                <div className='respuestas'>
                    <span className= {`rsp ${revelado ? a: null}`} key={1}>{question.respuestas[0].respuesta}</span>
                    <span className= {`rsp ${revelado ? b: null}`} key={2}>{question.respuestas[1].respuesta}</span>
                    <span className= {`rsp ${revelado ? c: null}`} key={3}>{question.respuestas[2].respuesta}</span>
                    <span className= {`rsp ${revelado ? d: null}`} key={4}>{question.respuestas[3].respuesta}</span>
                </div>
            </div>)
    
};


export default Cuestionario;