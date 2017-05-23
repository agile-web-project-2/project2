var passport = require('passport');
var express = require('express');
var router = express.Router();
var ctrlOthers = require('../controllers/others');
var ctrlLoginReg = require('../controllers/loginregister');
var ctrlMatch = require('../controllers/matches');


/***************************
* 'loginregister' Controller
****************************/
router.get('/login', ctrlLoginReg.login);// Login page
router.post('/login', passport.authenticate('local'), ctrlLoginReg.loginPOST);// Login page
// router.post('/login', passport.authenticate('local'), function(req, res) {res.redirect('/');});// Login page
router.get('/logout', ctrlLoginReg.logout);// Logout page
router.get('/register', ctrlLoginReg.register);// Register page
router.post('/register', ctrlLoginReg.registerPOST);// Register page
router.get('/editProfile', ctrlLoginReg.editProfile);// Find Edit Profile page
router.get('/profile/:userid', ctrlLoginReg.profile);// Profile page
router.post('/profile/:userid', ctrlLoginReg.editProfilePOST);// Profile page


/***************************
*   'matches' Controller
****************************/
router.get('/findMatch', ctrlMatch.match);

/***************************
*    'others' Controller
****************************/
router.get('/', ctrlOthers.homepage);// Home page
router.get('/about', ctrlOthers.about);// Other pages



module.exports = router;
