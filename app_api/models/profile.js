var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');


var profileSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    birthdate: Date,
    gym: String,
    interest1: String,
    interest2: String,
    interest3: String,
    address: String,
    about: String
});

profileSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Profile', profileSchema, 'profiles');
