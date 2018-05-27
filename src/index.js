const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io'); //permite conexion en tiempo real

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//db conexion
mongoose.connect('mongodb://localhost/chat-database')
  .then(db => console.log('base de datos conectada'))
  .catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 8000);

require('./sockets')(io);

//carpetas estaticas
app.use(express.static(path.join(__dirname, 'public')));

//escuchando el servidor
server.listen(app.get('port'), () => {
  console.log('servidor en puerto ', app.get('port'));
});
