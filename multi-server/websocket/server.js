const express = require('express');
let app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(8001);

io.on('connection', socket=>{
    socket.emit('message', 'hello web');

    socket.on('message', data=>{
        console.log(`recv message: ${data}`);
        if (data == 'hello') {
            socket.emit('message', 'hello back');
        }
    });

    socket.on('disconnect', ()=>{
        console.log('socket.io disconnect.');
    });
});