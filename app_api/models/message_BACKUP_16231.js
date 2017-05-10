// var mongoose = require('mongoose');

<<<<<<< HEAD
// var messageSchema = new mongoose.Schema({
//     username: String,
//     message: String,
//     timePosted: {
//         type: Date,
//         "default": Date.now
//     }
// });

// mongoose.model('Message', messageSchema, 'messageLog');
=======
var MessageSchema = new mongoose.Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
>>>>>>> Kieran
