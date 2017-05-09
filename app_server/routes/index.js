var passport = require('passport');
var express = require('express');
var router = express.Router();
var ctrlOthers = require('../controllers/others');
var ctrlLoginReg = require('../controllers/loginregister');


/***************************
* 'loginregister' Controller
****************************/
router.get('/login', ctrlLoginReg.login);// Login page
router.post('/login', passport.authenticate('local'), ctrlLoginReg.loginPOST);// Login page
router.get('/logout', ctrlLoginReg.logout);// Logout page 
router.get('/register', ctrlLoginReg.register);// Register page
router.post('/register', ctrlLoginReg.registerPOST);// Register page


/***************************
*    'others' Controller
****************************/
router.get('/', ctrlOthers.homepage);// Home page
router.get('/about', ctrlOthers.about);// Other pages 


module.exports = router;
