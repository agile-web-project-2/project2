var io = require('socket.io')();
var ctrlChat = require('./app_api/controllers/chat');

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('enter conversation', function(conversation){
    	socket.join(conversation);
    	console.log('joined ' + convesation);
    });
    socket.on('leave conversation', function(conversation){
    	socket.leave(conversation);
    	console.log('left ' + conversation);
    });
    socket.on('send message', function(conversation){
        console.log('sending message');
        io.sockets.in(conversation).emit('new messages', conversation);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

module.exports = io;
