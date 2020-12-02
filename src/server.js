const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {
    userJoin,
    userLeave,
    getMesaPlayers,
    getMesaSpectators,
    getCurrentUser
} = require('./utils/manageusers');


const formatMessage = require('./utils/handlemessages');
const { emit } = require('process');
//Foldes estatico
app.use(express.static(path.join(__dirname,'public')));

const chatBot = {
    name: "Croupier",
    id: "00"
};

//Cuando alguien se conecta
io.on('connection', socket => {
    socket.on('joinMesa', ({tipo, mesa, nickname, avatar, saldo}) => {
        const user = userJoin(socket.id, tipo, mesa, nickname, avatar, saldo);

        socket.join(user.mesa);

        //Anuncio de ususario unido
        socket.emit('messageServer', formatMessage(chatBot, `${user.nickname} se ha unido a la mesa`));

        console.log(getMesaPlayers(user.mesa));
        
        console.log(getMesaSpectators(user.mesa));
        //Send players and mesa info
        io.to(user.mesa).emit('mesaPlayers', {players: getMesaPlayers(user.mesa)});

        //Send spectators and mesa info
        io.to(user.mesa).emit('mesaSpectators', {
            spectators: getMesaSpectators(user.mesa) 
        });

        console.log(`nuevo ${user.tipo} en mesa ${user.mesa}`);

        socket.broadcast.to(user.mesa).emit(
            'messages', formatMessage('Croupier', `${user.nickname} se ha unido,`)
        );

        socket.on('message', (nickname, message) => {
            io.to(user.mesa).emit("messages", formatMessage(nickname, message));
        });

        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
            if(user){
                //Anuncio un jugador se ha ido
                io.to(user.mesa).emit('message', formatMessage(chatBot, `${user.nickname} a abandonado la mesa.`));
                io.to(user.mesa).emit("messages", {server: "Server", message: "Has leave the room"})
                
                //Actualizacion de listas
                if(user.tipo === "player"){
                    //Actualizacion de jugadores
                    io.to(user.mesa).emit('mesaPlayers', {
                        players: getMesaPlayers(user.mesa)
                    });
                } else if(user.tipo === 'spectator'){
                    //Actualizacion de espectadores
                    io.to(user.mesa).emit('mesaSpectators', {
                        spectators: getMesaSpectators(user.mesa) 
                    });
                }
            }
            console.log(`un usuario salio de mesa ${user.mesa}`);
        });

        //Esperar por pregunta para todos
        socket.on('vueltas', () => {
        const user = getCurrentUser(socket.id);
        //Mandar pregunta a la mesa
        const vext = Math.random() * (25- 10) + 10;
        const vint = Math.random() * (25- 10) + 10;
        console.log(`ext ${vext} int ${vint} a mesa ${user.mesa}`);
        io.to(user.mesa).emit("vext", vint);
        io.to(user.mesa).emit("vint", vint);
        })
    });


   });

const PORT = 8081 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
