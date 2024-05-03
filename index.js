const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// add this
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});
///

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit("send_messages_to_all_users",msg)
  });

  socket.on('typing',()=>{
    socket.broadcast.emit('show_typing_status')
  })
  socket.on('stop-typing',()=>{
    socket.broadcast.emit('stop_typing')
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


//emit ----> publish to an event using .emit('eventName',data)
//on ----> listen to event using .on("eventName",callback)