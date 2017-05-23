
var should = require('chai').should();

/************************************************************************************
 * For local Mongo Server start server e.g ( sudo mongod --dbpath /var/lib/mongodb/ ) 
 ************************************************************************************/

var mongoose = require('mongoose');
var mlab = require('../mlab-user-pass.js');

// require('../app_api/models/profile.js');
// var Profile = mongoose.model('Profile');
var Profile = require('../app_api/models/profile');
var db;


describe('Profile: Adds new profile to the database', function() {
    
    before(function(done){
        db = mongoose.connect('mongodb://localhost:27017/test');
        done();
    });

    beforeEach(function(done) {
        // create profile instance
        Profile.register(new Profile({username: 'user@test.com', name: 'testUserName', gender: 'male'}), 'p@s5w0Rd',
        function(err, profile) {
            if (err) {
                console.log('There was an error while registering the email!', err);
                console.log('profile: ' + profile);
                // sendJsonResponse(res, 400, err);
            } else {
                console.log('The email is registered!');
                // sendJsonResponse(res, 201, profile);
            }
            done();
        });
    });

    it('should find an profile by email address', function(done) {
        Profile.findOne({ username: 'user@test.com' }, function(err, profile) {
            profile.username.should.eql('user@test.com');
            console.log("   email: ", profile.username);
            done(); //Call done to tell mocha that we are done with this test
        });
    });

    it('should store password as hash', function(done) {
        Profile.findOne({ username: 'user@test.com' }, { hash: 1 }, function(err, profile) {
            profile.hash.should.exist;
            console.log("   hash: ", profile.hash);
            done(); //Call done to tell mocha that we are done with this test
        });
    });

    it('should find profile by email and update it', function(done) {
        var query = {username: 'user@test.com'};
        var update = { $set: {about: 'This is new about me.'}};
        var options = {new: true, upsert: true};
        var callback = function(err, profile) {
            if(err) {
                console.log("something went wrong when updating the data");
            }
            console.log(" about:", profile.about);
            profile.about.should.eql('This is new about me.')
            done();
        };
        Profile.findOneAndUpdate(query, update, options, callback);
    });

    it('should get the profile object by email', function(done) {
        var query = Profile.where({ username: 'user@test.com'});
        query.findOne(function(err, profile) {
            if (err) {
                console.log("something went wrong when updating the data");
            }
            if (profile) {
                console.log(profile)
            }
            done();
        });

    });


    afterEach(function(done) {
        Profile.remove({}, function() {
            done();
        });
    });

    after(function(done){// after all the tests have finished
        mongoose.connection.close();
        done();
    });
});





/*********************
    TEST REMOTE DB
**********************/

// var mongoose = require('mongoose');
// var dummySchema = new mongoose.Schema({
//     testString: String
// });
// var Dummy = mongoose.model('Dummy', dummySchema, 'dummy');


// describe('Remote Test Database Connect', function(){
//     before(function(done){//before the test begins
//         var dbURI = 'mongodb://'+mlab.testUser+':'+mlab.testPass+'@ds129651.mlab.com:29651/test-7975';
//         var options = {
//             server: { socketOptions: { keepAlive: 500000, connectTimeoutMS: 50000 } },
//             replset: { socketOptions: { keepAlive: 500000, connectTimeoutMS: 50000 } }
//         };
//         db = mongoose.connect(dbURI, options);
//         done();
//     });

//     beforeEach(function(done) {
//         // create dummy instance
//         var dummy_instance = new Dummy({
//             testString: 'cavalry'
//         });
//         // save the new model instance, passing a callback
//         dummy_instance.save(function(error) {
//             if (error) console.log('(saving to database) error ' + error.message);
//             else console.log('          no error - data saved to database');
//             done();
//         });
//     });

//     it('should find the remote dummy test string "cavalry"', function(done) {
//         Dummy.findOne({ testString: 'cavalry' }, function(err, dummy) {
//             dummy.testString.should.eql('cavalry');
//             console.log("   testString: ", dummy.testString);
//             done(); //Call done to tell mocha that we are done with this test
//         });
//     });

//     afterEach(function(done) {
//         Dummy.remove({}, function() {
//             done();
//         });
//     });

//     after(function(done){// after all the test have finished
//         mongoose.connection.close();
//         done();
//     });
// });