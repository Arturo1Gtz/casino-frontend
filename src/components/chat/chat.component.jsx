import React from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3001");

const usuario = {
    name: "Diego Flores",
    id: "#298761",
    //avatar: img
};

const mesa = 1;

socket.emit('chat', {usuario, mesa});

class Chat extends React.Component {
    //Aqui debe ir un chat sencillo
}

export default Chat;