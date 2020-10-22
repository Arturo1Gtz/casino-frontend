const server = require("http").createServer();

const io = require("socket.io")(server, {
    transports: ["websocket","polling"]
});

const ActivePlayers = {};
const Spectators = {};
io.on("connection", client => {
    
    client.on("jugar", jugador => {
        const user = {
            name: jugador.name,
            //avatar: jugador.avatar,
            id: client.id
        };
        ActivePlayers[client.id] = user;
        io.emit("connected", user);
        io.emit("ActivePlayers", Object.values(ActivePlayers));
    });

    client.on("espectar", espectador => {
        const user = {
            name: jugador.name,
            //avatar: jugador.avatar,
            id: client.id
        }
        Spectators[client.id] = user;
        io.emit("connected", user);
        io.emit("Spectators", Object.values(Spectators));
    });

    client.on("mandarPregunta", pregunta => {
        io.emit("pregunta", {
            pregunta: pregunta
        });
    });

    client.on("desconectarAP", () => {
        const user = ActivePlayers[client.id];
        delete ActivePlayers[client.id];
        io.emit("Jugador desconectado", client.id);
    });

    client.on("desconectarS", () => {
        const user = Spectators[client.id];
        delete Spectators[client.id];
        io.emit("Espectador desconectado", client.id);
    });
});

server.listen(3000);