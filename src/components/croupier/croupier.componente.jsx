import React from 'react' ;

import Ruleta from '../ruleta/ruleta.componente'

import boton from '../../img/button.png';

import './croupier.style.css'

class Croupier extends React.Component{
    constructor (props){
        super(props);
        this.state ={
            vueltasEx: 0,
            vueltasIn: 0,
            classRuletaEx: 'giroEx',
            classRuletaIn: 'giroIn',
            hide: false
        }
    }
    render(){
        const {vueltasEx, vueltasIn, classRuletaEx, classRuletaIn,hide} = this.state;
        const sinGiro =()=>{
            const actualDeg = this.state.vueltasEx % 360;
            const actualDeg2 = this.state.vueltasIn % 360;
            this.setState({hide:false, classRuletaEx: 'singiro', classRuletaIn: 'singiro', vueltasEx: actualDeg, vueltasIn: actualDeg2},() => 
            console.log(this.state));
            
        }
        const calcVueltas=()=>{
            this.setState({hide:true,classRuletaEx: 'giroEx', classRuletaIn: 'giroIn', vueltasEx:Math.floor(Math.random(7380)*(3600))+3600,vueltasIn:Math.floor(Math.random(7380)*(3600))+3600},() => 
            console.log(this.state));
            setTimeout(sinGiro,7000);
        }
        
        return(
            <div className={'croupier'}>
                {hide ? null:
                <img src={boton} alt='boton' className='boton' onClick={calcVueltas}/>
                }
                <Ruleta className='ruleta' claseEx={classRuletaEx} vueltasE={vueltasEx} claseIn={classRuletaIn} vueltasI={vueltasIn}></Ruleta>
            </div>
        )
    }

};

export default Croupier;