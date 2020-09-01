import React from 'react';
import './gameBanner.style.scss'



const GameBanner = (props)=> {
    return(
        <div  className='link2'  onClick={props.action}  >
            <div className='imagendeFondo' style={{backgroundImage: `url(${props.imagen})`}}   />
            <div className='title'>
                <h2>{props.titulo.toUpperCase()}</h2>
            </div>
        </div >
    );
};

export default GameBanner;