var express = require('express');
var router = express.Router();
var ctrlOthers = require('../controllers/others');
var ctrlLoginReg = require('../controllers/loginregister');

// var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project 2' });
});

/* Login page */
router.get('/login', ctrlLoginReg.login);

/* Register page */
router.get('/register', ctrlLoginReg.register);
router.post('/register', ctrlLoginReg.addToRegister);


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
