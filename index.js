var express = require('express');
var socket = require('socket.io');

/// app setup

var app = express();
var server = app.listen(4000, function(){
  console.log('listening for requests on port 4000');
});


/// static files

app.use(express.static('public'));


/// socket setup on backend

var io = socket(server);

io.on('connection', (socket) => {
  console.log('socket connection established', socket.id);

  socket.on('chat-message', function(data) {
    io.sockets.emit('chat-message', data);
  })
 
  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data)
  });

});


