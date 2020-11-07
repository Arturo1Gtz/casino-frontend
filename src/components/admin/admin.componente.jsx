import React from 'react';
import io from "socket.io-client";

import Croupier from '../croupier/croupier.componente';
import './admin.styles.scss';

const socket = io("http;//localhost:3016", {
    transports: ["websocket","polling"]
});

class Admin extends React.Component{
  

    render(){
    return(
        <div className={'admin'}>
        <Croupier  ></Croupier>
        </div>
        
        
    )
}
}

export default Admin;