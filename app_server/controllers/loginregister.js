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


/******************
*  'login' page
*******************/
/*GET*/
module.exports.login = function(req, res) {
    res.render('login', {
        title: 'Login'
    });
};

/******************
*  'register' page
*******************/
/*GET*/
module.exports.register = function(req, res) {
    res.render('register', {
        title: 'Register'
    });
};

/*POST*/
/* action to register a new user */
module.exports.registerPOST = function(req, res) {
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
}

/*********************
*  'Edit Profile' page 
**********************/
/*GET*/
module.exports.editProfile = function(req, res) {
    res.render('editProfile', {
        title: 'Edit Profile'
    });
};
