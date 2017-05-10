var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    timePosted: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model('Message', messageSchema, 'messageLog');