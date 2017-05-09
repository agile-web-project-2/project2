var passport = require('passport');
var express = require('express');
var router = express.Router();
var ctrlOthers = require('../controllers/others');
var ctrlLoginReg = require('../controllers/loginregister');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Project 2', user: req.user });
});

/* Login page */
router.get('/login', ctrlLoginReg.login);
router.post('/login', passport.authenticate('local'), ctrlLoginReg.loginPOST);

/* Logout page */
router.get('/logout', ctrlLoginReg.logout);

/* Register page */
router.get('/register', ctrlLoginReg.register);
router.post('/register', ctrlLoginReg.registerPOST);

/* Other pages */
router.get('/about', ctrlOthers.about);


module.exports = router;
