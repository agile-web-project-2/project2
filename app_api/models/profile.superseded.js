var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: Number,
        required: true,
        min: 0, //need way of only items in ['M', 'F', 'OTHER']
        max: 2
    },
    profilePic: String,
    aboutMe: String,
    coords: {
        type: [Number], //longitude, latitude ordering
        index: '2dsphere'
    },
    joinDate: {
        type: Date,
        "default": Date.now
    },
    interests: [String],
    gymMemberships: [String]
});

mongoose.model('Profile', profileSchema, 'profiles');
