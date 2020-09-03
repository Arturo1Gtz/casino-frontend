import React from 'react' ;

import Ruleta from '../ruleta/ruleta.componente';
import Cuestionario from '../cuestionario/cuestionario.componente';

import boton from '../../img/button.png';

import './croupier.style.scss'

class Croupier extends React.Component{
    constructor (props){
        super(props);
        this.state ={
            vueltasEx: 0,
            vueltasIn: 0,
            onGame: false,
            onGiro:false,
            pregunta:false,
            seccIn: 6,
            seccEx:4,
            acSeccIn: 0,
            acSeccEx:0
        }
    }
    render(){
        const {vueltasEx, vueltasIn,onGame,onGiro,seccEx,seccIn} = this.state;
        
        const calcVueltas=()=>{
            this.setState({onGame:true, onGiro:true,  vueltasEx:Math.random(25)*(10) + 10 ,vueltasIn:Math.random(20)*(10) + 10},() => 
            console.log('vueltas',this.state));
        }
        const sinGiro =()=>{
            const actualDegE = this.state.vueltasEx - Math.floor(this.state.vueltasEx);
            const actualDegI = this.state.vueltasIn - Math.floor(this.state.vueltasIn);

            const actualSeccEx = Math.floor(actualDegE*seccEx);
            const actualSeccIn = Math.floor(actualDegI*seccIn);
            
            this.setState({onGiro: false,  pregunta:true, vueltasEx: actualDegE, vueltasIn: actualDegI, acSeccEx: actualSeccEx, acSeccIn: actualSeccIn},() => 
            console.log('simGiro',this.state));
            

        }
        const endGame=()=>{
            this.setState({pregunta:false, onGame:false},()=>
            console.log('endgame',this.state));
        }
        
        function juego(){
            calcVueltas();
            setTimeout(sinGiro,7000);
            setTimeout(endGame,17000);
        }  

        return(
            <div className={'croupier'}>
                <div className={'juego'}>
                    <div className='ruletaCont'>
                        <Ruleta  vueltasE={vueltasEx} vueltasI={vueltasIn} giro={onGiro}></Ruleta>

                    </div>
                    <div className='cuestionarioCont'>
                        {this.state.pregunta?
                        <Cuestionario seccPregunta={this.state.acSeccEx} apuesta={this.state.acSeccIn}> </Cuestionario>
                        :null}

                    </div>
                </div>
                {onGame ? null:
                <img src={boton} alt='boton' className='boton' onClick={juego}/>
                }
            </div> 
        )
    }

};

export default Croupier;