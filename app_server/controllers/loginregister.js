var passport = require('passport');
var Account = require('../../app_api/models/account'); // Remove this from here and put inside the API

/* Request needed to GET data to the views */
var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://pairletes.herokuapp.com";
}

/*  Helpers  */
var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

/* GET 'login' page */

module.exports.login = function(req, res) {
    console.log('req: ' + req);
    console.log('req.user: ' + req.user);
    res.render('login', {
        title: 'Login',
        user: req.user
    });
};

/* GET 'register' page */
module.exports.register = function(req, res) {
    res.render('register', {
        title: 'Register'
    });
};

/* POST action to register a new user */
/* /register */
/*module.exports.addToRegister = function(req, res) {
    var requestOptions, path, postdata;
    path = "/api/account";
    postdata = {
        email: req.body.email,
        password: req.body.password
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postdata
    };
    console.log(postdata.email);
    console.log(postdata.password);
    if (!postdata.email || !postdata.password) {
    res.redirect('/register?err=val');
    } else {
        request(requestOptions, function(err, response, body) {
                if (err) {
                    console.log(err);
                } else if (response.statusCode === 201) {
                    res.redirect('/login');
                } else if (response.statusCode === 400 && body.email && body.email === "ValidationError" ) {
                    res.redirect('/register?err=val');
                } else {
                    console.log(body);
                    _showError(req, res, response.statusCode);
                }
        });
    }

}*/
module.exports.addToRegister = function(req, res, next) {
    Account.register(new Account({username: req.body.email}), req.body.password, function(err, account) {
        if (err) {
            console.log('There was an error while registering the email!', err);
            // return res.render('register', { account : account });
            return next(err);
        }
        console.log('The email is registered!');
        // Authenticate newly registered user and reedirect them to the home page
        // passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        // });
    });
};
