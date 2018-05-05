$(function(){

  const socket = io();

  //obteniendo los elementos del DOm desde las interfaces
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  //eventos
  $messageForm.submit( e => {
    e.preventDefault();
    socket.emit('enviar mensaje', $messageBox.val());
    $messageBox.val('');
  });

  socket.on('nuevo mensaje', function (data){
      $chat.append(data + '<br/>');
  });

})
