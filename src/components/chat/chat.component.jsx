import React, {
    useEffect,
    useState,
    useRef
} from 'react';
//import socket from './socket'
import { connect } from 'react-redux'
import './chat.style.scss'

/*const usuario = {
    nickname: "BurritoQuemado",
    name: "Diego Flores",
    id: "#298761",
    //avatar: img
};

const mesa = 1;

socket.emit('message', {usuario, mesa});*/

const Chat = (props) => {
    const {currentUser, socket} = props;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const nickname = currentUser.nickname;
    const avatar = currentUser.imgurl;
    const saldo = currentUser.credits;  
    const bottomRef = useRef(null);

    /*useEffect(() => {
        socket.emit('joinMesa', tipo, mesa, nickname, avatar, saldo);
    }, [nick]);*/

    useEffect(() => {
        socket.on('messages', message => {
            setMessages([...messages, message])
        })

        return () => {socket.off()}
    }, [messages])

    /*useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', });
    })*/

    const handleSubmit = e => {
        e.preventDefault();
        socket.emit('message', nickname, message)
        setMessage('');
    }

    const MapMessages = messages.map((messa) => 
        <div className='chatMessage'>
            <b>{messa.nickname}</b> dijo: {messa.text} {messa.time}
            <div ref={bottomRef}></div>
        </div>
    )

    return(
        <div class="chatContainer">
            <div className='messagesContainer'>
                {MapMessages}
            </div>
            <div class="chatForm">
                <form onSubmit = {handleSubmit}>
                    <input type="text" id="message" placeholder="Escribir mensaje" required autoComplete="off" value={message} onChange={e => setMessage(e.target.value)}/>
                    <button type="submit">Enviar</button>
                </form>
            </div>

        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(
    mapStateToProps,
    null
)(Chat);