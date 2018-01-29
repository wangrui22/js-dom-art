(function() {

    let socket = io.connect('ws://localhost:8001');
    socket.emit('message', 'hello app');
    socket.on('message', data=>{
        document.getElementById('label-message').innerHTML = data;
    });

    document.getElementById('btn-hello').onclick = function() {
        document.getElementById('label-message').innerHTML = 'hello';
        setTimeout(function() {
            socket.emit('message', 'hello');
        },1000); 
    };

})();