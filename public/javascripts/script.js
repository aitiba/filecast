var socket = io.connect();
// var room = "abc123";
var room = window.location.href.split("/")[3];

$("#buttom").on("click",function() {
   var message = "<a href='#'>IEUP!</a>";
   socket.emit('sendMessage', room, message);
});
//al conectarse se conecta a la sala
socket.on('connect', function() {
   socket.emit('room', room);
});

// pintar el mensaje del servidor
socket.on('message', function(data) {
  $("body").append(data);
});
