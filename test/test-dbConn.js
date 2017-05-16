
var should = require('chai').should();
var mongoose = require('mongoose');

/************************************************************************************
 * For local Mongo Server start server e.g ( sudo mongod --dbpath /var/lib/mongodb/ ) 
 ************************************************************************************/

var mlab = require('../mlab-user-pass.js');

var Account = require('../app_api/models/account');
var db;

/*********************************
 *     Create Dummy Model
 *********************************/

var dummySchema = new mongoose.Schema({
    testString: String
});
var Dummy = mongoose.model('Dummy', dummySchema, 'dummy');


/**********************************************
 *  Start describing what the tests should do
 **********************************************/

describe('Account: Adds new account to the database (If fails: startup local "mongod" )', function() {
    
    before(function(done){
        db = mongoose.connect('mongodb://localhost:27017/test');
        done();
    });

    beforeEach(function(done) {
        // create account instance
        var account_instance = new Account({
            username: 'user@test.com', 
            name: 'testUserName', 
            gender: 'male'
        });

        Account.register((account_instance), 'p@s5w0Rd',
        function(err, account) {
            if (err) {
                console.log('There was an error while registering the email!', err);
                console.log('account: ' + account);
                // sendJsonResponse(res, 400, err);
            } else {
                // console.log('The email is registered!');
                // sendJsonResponse(res, 201, account);
            }
            done();
        });
    });

    it('should find an account by email address', function(done) {
        Account.findOne({ username: 'user@test.com' }, function(err, account) {
            account.username.should.eql('user@test.com');
            console.log("   email: ", account.username);
            done(); //Call done to tell mocha that we are done with this test
        });
    });

    it('should store password as hash', function(done) {
        Account.findOne({ username: 'user@test.com' }, { hash: 1 }, function(err, account) {
            account.hash.should.exist;
            console.log("   hash: ", account.hash);
            done(); //Call done to tell mocha that we are done with this test
        });
    });


    afterEach(function(done) {
        Account.remove({}, function() {
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

describe('Remote Test Database Connect', function(){
    before(function(done){//before the test begins
        var dbURI = 'mongodb://'+mlab.testUser+':'+mlab.testPass+'@ds129651.mlab.com:29651/test-7975';
        var options = {
            server: { socketOptions: { keepAlive: 500000, connectTimeoutMS: 50000 } },
            replset: { socketOptions: { keepAlive: 500000, connectTimeoutMS: 50000 } }
        };
        db = mongoose.connect(dbURI, options);
        done();
    });

    beforeEach(function(done) {
        // create dummy instance
        var dummy_instance = new Dummy({
            testString: 'cavalry'
        });
        // save the new model instance, passing a callback
        dummy_instance.save(function(error) {
            if (error) console.log('(saving to database) error ' + error.message);
            else console.log('          no error - data saved to database');
            done();
        });
    });

    it('should find the remote dummy test string "cavalry"', function(done) {
        Dummy.findOne({ testString: 'cavalry' }, function(err, dummy) {
            dummy.testString.should.eql('cavalry');
            console.log("   testString: ", dummy.testString);
            done(); //Call done to tell mocha that we are done with this test
        });
    });

    afterEach(function(done) {
        Dummy.remove({}, function() {
            done();
        });
    });

    after(function(done){// after all the test have finished
        mongoose.connection.close();
        done();
    });
});