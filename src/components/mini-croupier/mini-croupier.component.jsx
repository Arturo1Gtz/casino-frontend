import React from 'react';

import './mini-croupier.style.scss';
import MesaFondo from '../../img/mesa-de-inicio.png';
import Ocup from '../../img/lugar-ocupado.png';
import Disp from '../../img/lugar-disponible.png';
import Sillon from '../../img/silla-individual.png';

const MiniCroupier =(props)=>{
    const arr = [1,1,1]
    const {num} = props;
    return(
        <div className={'mini'}>
            <span className={'mini__num'}>{num}</span>
            {/* <span>mini croupier</span> */}
            <div className={'mini__front'}>
                <div className={'mini__front__sillas'}>
                    <img src={`${arr[0]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                    <img src={`${arr[1]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                    <img src={`${arr[2]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                </div>
                <div className={'mini__front__center'}>
                    <img src={MesaFondo} alt ='fondoJuego' className={'mini__front__center__imgBg'}/> 
                    <img src={`${arr[6]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__center__img`} />
                        
                </div>
                <div className={'mini__front__sillas'}>
                    <img src={`${arr[3]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                    <img src={`${arr[4]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                    <img src={`${arr[5]?Ocup:Disp}`} alt ='img_silla' className={`mini__front__sillas__img`} />
                </div>
            </div>

            {/* fondo con sillas */}
            <div className={'mini__fondo'}>
                <div className={'mini__fondo__sillas__izq'}>
                    <img src={Sillon} alt ='img_silla' className={`mini__fondo__sillas__izq__img`} />
                    <img src={Sillon} alt ='img_silla' className={`mini__fondo__sillas__izq__img`} />
                    <img src={Sillon} alt ='img_silla' className={`mini__fondo__sillas__izq__img`} />
                </div>
                <div className={'mini__fondo__center'}>
                    <img src={MesaFondo} alt ='fondoJuego' className={'mini__fondo__center__imgBg'}/> 
                    <img src={Sillon} alt ='img_silla' className={`mini__fondo__center__img`} />
                        
                </div>
                <div className={'mini__fondo__sillas__der'}>
                    <img src={Sillon} alt ='img_silla' className={`mini__fondo__sillas__der__img`} />
                    <img src={Sillon} alt ='img_silla' className={`mini__fondo__sillas__der__img`} />
                    <img src={Sillon} alt ='img_silla' className={`mini__fondo__sillas__der__img`} />
                </div>
            </div>

        </div>
    )
}

export default MiniCroupier;