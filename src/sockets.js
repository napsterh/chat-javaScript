
module.exports = function(io) {

  io.on('connection', socket => {
    console.log('nuevo usuario conectado');

    socket.on('enviar mensaje', function (data) {
      io.sockets.emit('nuevo mensaje', data);
    });

  });
}
