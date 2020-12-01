import React, { useEffect, useState } from 'react';

import Preguntas from '../../files/preguntas.js';
import Timer from '../timer/timer.component';

import './cuestionario.style.scss';

function Cuestionario(props){

    const {seccPregunta, pregunta,revelado, responder, respondio} = props;
    const [preguntas,setPreguntas] = useState(Preguntas)

    const seccion = preguntas[seccPregunta];
    const question = seccion.preguntas[pregunta];
    const respuestaObj = question.respuestas.filter(res => res.correcta === true);
    const respuesta = respuestaObj[0].respuesta;
    // const [a,setA] = useState('rojo') ;
    // const [b,setB] = useState('rojo') ;
    // const [c,setC] = useState('rojo') ;
    // const [d,setD] = useState('rojo') ;

    // useEffect(()=>{
    //         switch(respuesta){
    //             case 'a': setA('verde'); break;
    //             case 'b': setB('verde'); break;
    //             case 'c': setC('verde'); break;
    //             case 'd': setD('verde'); break;
    //             default: break;
    //         }
    //     }
    // )

        return(<div className='cuestionario'>
                <div className='preguntaContainer'>
                    <span className='Seccion'> Categoria: {seccion.categoria}</span>
                    <span className='Apuesta'>Respuesta: {respuesta}</span>
                    <span className='Pregunta'>{question.pregunta}</span>
                    <div className={'temporizador'}>
                    <Timer  time={15}></Timer>

                    </div>

                </div>
                <div className={`respuestas ${respondio && !revelado ? 'off' : null}`}>
                    <span className= {`rsp ${revelado? question.respuestas[0].correcta?'verde':'rojo': null}`} key={1} onClick={()=>responder('a')} >{question.respuestas[0].respuesta}</span>
                    <span className= {`rsp ${revelado? question.respuestas[1].correcta?'verde':'rojo': null}`} key={2} onClick={()=>responder('b')} >{question.respuestas[1].respuesta}</span>
                    <span className= {`rsp ${revelado? question.respuestas[2].correcta?'verde':'rojo': null}`} key={3} onClick={()=>responder('c')} >{question.respuestas[2].respuesta}</span>
                    <span className= {`rsp ${revelado? question.respuestas[3].correcta?'verde':'rojo': null}`} key={4} onClick={()=>responder('d')} >{question.respuestas[3].respuesta}</span>
                </div>
            </div>)
    
};


export default Cuestionario;