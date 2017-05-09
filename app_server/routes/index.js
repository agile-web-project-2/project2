var express = require('express');
var router = express.Router();
var ctrlOthers = require('../controllers/others');
var ctrlLoginReg = require('../controllers/loginregister');
<<<<<<< HEAD
var ctrlMatch = require('../controllers/matches');
=======
var ctrlMatch = require('../controllers/matches.js');
>>>>>>> master

// var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project 2' });
});

/* Login page */
router.get('/login', ctrlLoginReg.login);

/* Register page */
router.get('/register', ctrlLoginReg.register);

<<<<<<< HEAD
/* Register page */
router.get('/findMatch', ctrlMatch.match);

=======
/* Find Match page */
router.get('/findMatch', ctrlMatch.match);

/* Find Edit Profile page */
router.get('/editProfile', ctrlLoginReg.editProfile);

>>>>>>> master
/* Other pages */
router.get('/about', ctrlOthers.about);

// router.get('/register', function(req, res) {
//       res.render('register', { });
// });

// router.post('/register', function(req, res) {

//       Account.
//         register(new Account({ username : req.body.username }),
//              req.body.password,
//          function(err, account) {
//                    if (err) {
//                      return res.render('register', { account : account });
//                    }
//                    passport.authenticate('local')(req, res, function () {
//                      res.redirect('/');
//                      });
//                  });
// });

module.exports = router;
