// require('../models/db');
// var mongoose = require('mongoose');
// var profile = mongoose.model('Profile');
var Profile = require('../models/profile');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


/*******************
*    /api/profile
********************/
/*POST*/
/* Adds a new profile to the database  */
module.exports.profilePOSTapi = function(req, res) {
    Profile.register(new Profile({
        username: req.body.email,
        name: req.body.name,
        gender: req.body.gender,
        birthdate: req.body.birthdate}), req.body.password,
        function(err, profile) {
            if (err) {
                console.log('There was an error while registering the email!', err);
                console.log('profile: ' + profile);
                sendJsonResponse(res, 400, err);
            } else {
                console.log('The email is registered!');
                sendJsonResponse(res, 201, profile);
            }
        });
};

/*PUT*/
/* Update user profile in database  */
module.exports.profileUpdateOne = function(req, res) {
    console.log("my user id: ", req.params.userid);
    console.log(" ----------------> request body api: ", req.body);

    var query = {_id: req.params.userid};
    var update = { 
        $set: {  
            street: req.body.street,
            city: req.body.city,
            country: req.body.country,
            interest1: req.body.interest1,
            interest2: req.body.interest2,
            interest3: req.body.interest3,
            gym: req.body.gym,
            about: req.body.about
        }
    };
    var options = {new: true, upsert: true};
    var callback = function(err, profile) {
        if(err) {
            console.log("something went wrong when updating the data!", err);
            console.log('profile: ', profile);
            sendJsonResponse(res, 400, err);
        } else {
            console.log('The update to the user profile was successful!')
            sendJsonResponse(res, 200, profile);
            console.log('module.exports.profileUpdateOne: ---> req.body: ', req.body)
        }
    
    };
    Profile.findOneAndUpdate(query, update, options, callback);
    // Account.save(function(err){
    //     if(err)
    //         res.send(err);
    //         res.json({message: 'Gym info updated.'})
    // });

    // //New account model object
    // var account = new Account();
    // Account.findById(req.body._id, function(err, account){
    //   if (err)
    //     res.send(err);

    //   //update
    //   account.gym = req.body.gym;

    //   //save
    //   account.save(function(err){
    //     if(err)
    //       res.send(err);

    //     res.json(account);
    //   });
    // });
};
