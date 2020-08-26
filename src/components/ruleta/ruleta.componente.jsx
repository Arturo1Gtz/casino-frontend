import React from 'react';


// import ruleta from '../../img/círculo.png';
// import flecha from '../../img/triángulo.png';
import fondo from '../../img/ruletaFondo.png';
import ruletaEx from '../../img/ruletaExterna.png';
import ruletaIn from '../../img/ruletaInterna.png';
import selector from '../../img/ruletaSelector.png';

import './ruleta.style.css';

function Ruleta(props) {
    //Hooks
    // const [vueltas, activateRuleta] = useState(false);
    
    return (   
        <div className='ruleta'>    
            <img src={fondo} alt='fondo' className='elemento'/>
            <img src ={ruletaEx} alt='ruletaEx' className={`elemento ${props.claseEx}`} style={{transform:`rotate(${props.vueltasE}deg)`}}/>
            <img src ={ruletaIn} alt='ruletaIn' className={`elemento ${props.claseIn}`} style={{transform:`rotate(${props.vueltasI}deg)`}}/>
            <img src={selector} alt='selector' className='elemento selector'/>

            
        </div>
    )
};

export default Ruleta;