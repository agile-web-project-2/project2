var mongoose = require('mongoose');

// var passportLocalMongoose = require('passport-local-mongoose');


var accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema, 'accounts');