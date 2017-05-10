// var mongoose = require('mongoose');

<<<<<<< HEAD
// var chatSchema = new mongoose.Schema({
//     participants: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Profile'
//     }]
//     chatLog: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Message'
//     }]
// });

// mongoose.model('Chat', chatSchema, 'chats');
=======
//Defines how chat messages are stored in database
var chatSchema = new mongoose.Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model("chat", chatSchema);



>>>>>>> Kieran
