const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');//permite conexion en tiempo real

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//carpetas estaticas
app.use(express.static(path.join(__dirname, 'public')));

//escuchando el servidor
server.listen(app.get('port'), () => {
  console.log('servidor en puerto ', app.get('port'));
});
