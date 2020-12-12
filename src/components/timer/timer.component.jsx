import React,{useState, useEffect} from 'react';

import './timer.styles.scss';

class Timer extends React.Component{ 
    state ={
        segundos: this.props.time
    }

    componentDidMount(){
        this.myInterval = setInterval(() => {
            const { segundos} = this.state;
            const {jugadores} = this.props

            if(segundos > 0){
                this.setState(({segundos})=>({segundos : segundos - 1}))
            }

            if(segundos === 0){
                if(this.props.accion){
                    console.log('timer',this.props)
                    if(Object.keys(jugadores).length){
                        this.props.accion()
                        clearInterval(this.myInterval)
                    }else(this.setState({segundos: this.props.time}))
                }else{
                    clearInterval(this.myInterval)
                }
            }
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.myInterval)
    }

    render(){
        const {segundos} = this.state;

        return(
            <div className={'timer'}>
            <span>{`00 : ${segundos < 10 ? `0${segundos}` : segundos}`}</span>
        </div>
    )
    
}
}

export default Timer;