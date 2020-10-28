import React from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3001");

const usuario = {
    nickname: "BurritoQuemado",
    name: "Diego Flores",
    id: "#298761",
    //avatar: img
};

const mesa = 1;

socket.emit('message', {usuario, mesa});

const Chat = () => {
    return(
        <div class="Chat">
            <div class="chatMessages"></div>
            <div class="chatForm">
                <form>
                    <input type="text" id="msg" placeholder="Escribir mensaje" required autoComplete="off" />
                    <button class="formButton">Enviar</button>
                </form>
            </div>

        </div>
    );
}

export default Chat;