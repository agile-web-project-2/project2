var mongoose = require('mongoose');

//Defines how chat messages are stored in database
var chatSchema = new mongoose.Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model("chat", chatSchema);

