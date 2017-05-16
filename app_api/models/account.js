var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');


var accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema, 'accounts');
