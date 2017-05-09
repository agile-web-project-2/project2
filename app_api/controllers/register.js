require('../models/db');
var mongoose = require('mongoose');
var account = mongoose.model('Account'); 

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET */

router.get('/register', function(req, res) {
      res.render('register', { });
});

router.post('/register', function(req, res) {
      Account.
        register(new Account({ username : req.body.username }), 
             req.body.password, 
         function(err, account) {
                   if (err) {
                     return res.render('register', { account : account });
                   }
                   passport.authenticate('local')(req, res, function () {
                     res.redirect('/');
                     });
                 });
});