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
    getMesaSpectators
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
    socket.on('joinMesa', ({tipo, mesa, usuario}) => {
        const user = userJoin(socket.id, tipo, mesa, usuario);

        socket.join(user.mesa);

        //Anuncio de ususario unido
        socket.emit('message', formatMessage(chatBot, `${user.usuario.nickname} se ha unido a la mesa`));

        //Send players and mesa info
        io.to(user.mesa).emit('mesaPlayers', {
            mesa: user.mesa,
            players: getMesaPlayers(user.mesa)
        });

        //Send spectators and mesa info
        io.to(user.mesa).emit('mesaSpectators', {
            mesa: user.mesa,
            spectators: getMesaSpectators(user.mesa) 
        });

        console.log(`nuevo ${user.tipo} en mesa ${user.mesa}`);
    });

    //Esperar por pregunta para todos
    socket.on('pregunta', pregunta => {
        const user = getCurrentUser(socket.id);
        //Mandar pregunta a la mesa
        io.to(user.mesa).emit('pregunta', pregunta);
    })
    
    //Cuando alguien se desconecta
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            //Anuncio un jugador se ha ido
            io.to(user.mesa).emit('message', formatMessage(chatBot, `${user.usuario.nickname} a abandonado la mesa.`));
            
            //Actualizacion de listas
            if(user.tipo === "player"){
                //Actualizacion de jugadores
                io.to(user.mesa).emit('mesaPlayers', {
                    mesa: user.mesa,
                    players: getMesaPlayers(user.mesa)
                });
            } else if(user.tipo === 'spectator'){
                //Actualizacion de espectadores
                io.to(user.mesa).emit('mesaSpectators', {
                    mesa: user.mesa,
                    spectators: getMesaSpectators(user.mesa) 
                });
            }
        }
        //console.log(`${user.tipo} salio de mesa ${user.mesa}`);
    });
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
