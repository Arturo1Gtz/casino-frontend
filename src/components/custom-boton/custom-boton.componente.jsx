import React from 'react';
import './custom-boton.style.scss';


const CustomBoton = ({children, color,lugar,...otherProps}) =>(
    <button className={`custom-boton ${color} ${lugar}`} {...otherProps}>
    {children}
  </button>
);
export default CustomBoton;