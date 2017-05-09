var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');


var accountSchema = new mongoose.Schema({
    email: String,
    password: String
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema, 'accounts');