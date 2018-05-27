$(function(){

  const socket = io();

  //obteniendo los elementos del DOm desde las interfaces
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  //obteniendo los elementos del Dom desde nickNameForm
  const $nickForm = $('#nickForm');
  const $nickname = $('#nickname');
  const $nickError = $('#nickError');

  const $users = $('#usernames');


  $nickForm.submit(e => {
    e.preventDefault();
    socket.emit('nuevo usuario', $nickname.val(), data => {
      if (data) {
        $('#nickWrap').hide();
        $('#contentWrap').show();
      } else {
        $nickError.html(`
          <div class="alert alert-danger">
            Este usuario ya existe
          </div>
        `);
      }
      $nickname.val('');
    });
  });

  //eventos
  $messageForm.submit( e => {
    e.preventDefault();
    socket.emit('enviar mensaje', $messageBox.val(), data => {
      $chat.append(`<p class="Error">${data}</p>`)
    });
    $messageBox.val('');
  });

  socket.on('nuevo mensaje', function (data){
      $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '</br>');
  });

  socket.on('usernames', data => {
    let html = '';
    for (let i = 0; i < data.length; i++){
      html += `<p><i class="fas fa-user-ninja"></i> ${data[i]}</p>`
    };
    $users.html(html);
  });

  socket.on('whisper', data => {
    $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`);
  });

  socket.on('cargar mensajes antiguos', msgs =>{
    for(let i = 0; i < msgs.length; i++){
      displayMsg(msgs[i]);
    }
  })

  function displayMsg(data){
    $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`);
  }
})
