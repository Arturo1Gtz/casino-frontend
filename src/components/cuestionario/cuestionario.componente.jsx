import React from 'react';

import {connect} from 'react-redux';
import {setCurrentRespuesta} from '../../redux/resCorrecta/resCorrec.actions';

import Preguntas from './preguntas.js';

import './cuestionario.style.scss';


class Cuestionario extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            preguntas: Preguntas
        };

    }
    render(){
        const {seccPregunta, apuesta, pregunta} = this.props;
        const seccion = this.state.preguntas[seccPregunta];
        const question = seccion.preguntas[pregunta];
        const respuesta = question.respuestas.filter(res => res.correcta === true);
        this.props.setCurrentRespuesta(respuesta[0].respuesta);

        // console.log('respuesta', respuesta[0].respuesta);

        return<div className='cuestionario'>
                <div className='preguntaContainer'>
                    <span className='Seccion'> Categoria: {seccion.categoria}</span><br/>
                    <span className='Apuesta'>Apuesta: {apuesta}</span><br/><br/>
                    <span className='Pregunta'>{question.pregunta}</span>

                </div>
                <div className='respuestas'>
                    <span className='rsp' key={1}>{question.respuestas[0].respuesta}</span>
                    <span className='rsp' key={2}>{question.respuestas[1].respuesta}</span>
                    <span className='rsp' key={3}>{question.respuestas[2].respuesta}</span>
                    <span className='rsp' key={4}>{question.respuestas[3].respuesta}</span>
                </div>
            </div>
    }
};

const mapDipatchToProps = dispatch => ({
    setCurrentRespuesta: respuesta => dispatch(setCurrentRespuesta(respuesta))
}); 

export default connect(null, mapDipatchToProps)(Cuestionario);