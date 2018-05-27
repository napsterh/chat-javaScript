const Chat = require('./models/Chat');
module.exports = function(io) {
  let users = {

  };

  io.on('connection', async socket => {
    console.log('nuevo usuario conectado');

    let messages = await Chat.find({});
    socket.emit('cargar mensajes antiguos', messages);

    socket.on('nuevo usuario', (data, cb) => {
      if (data in users) {
        cb(false);
      } else {
        cb(true);
        socket.nickname = data;
        users[socket.nickname] = socket;
        updateNicknames();
      }
    });

    socket.on('enviar mensaje', async (data, cb) => {

      var msg = data.trim();

      if (msg.substr(0, 3) === '/w ') {
        msg = msg.substr(3);
        const index = msg.indexOf(' ');
        if (index !== -1) {
          var name = msg.substring(0, index);
          var msg = msg.substring(index + 1);
          if (name in users) {
            users[name].emit('whisper', {
              msg,
              nick: socket.nickname
            });
          } else {
            cb('Error ingrese un usuario valido');
          }
        } else {
          cb('Error porvafor ingresa tu mensaje');
        }
      } else {

        var newMsg = new Chat({
          msg,
          nick: socket.nickname
        });
        await newMsg.save();

        io.sockets.emit('nuevo mensaje', {
          msg: data,
          nick: socket.nickname
        });
      }
    });

    socket.on('desconectado', data => {
      if (!socket.nickname) return;
      delete users[socket.nickname];
      updateNicknames();

    });

    function updateNicknames() {
      io.sockets.emit('usernames', Object.keys(users));
    }
  });
}
