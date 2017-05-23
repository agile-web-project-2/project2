var validator = require('validator');

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
    console.log('req: ' + req);
    console.log('req.user: ' + req.user);
    res.render('login', {
        title: 'Login',
        user: req.user
    });
};
/* POST */
module.exports.loginPOST = function(req, res) {
    res.redirect('/profile/'+req.user.id);
};

/******************
*  'logout' page
*******************/
/* GET */
module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

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
    //Parse birthdate ready for mongodb
    var bday = req.body.yr + '-' + req.body.mth + '-' + req.body.day;
    // console.log(bday);
    //Convert rest of form to json for db
    var requestOptions, path, postdata;
    path = "/api/profile";
    postdata = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        gender: req.body.gender,
        birthdate: bday
    };

    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postdata
    };
    console.log(postdata.email);
    console.log(postdata.password);
    console.log(postdata.name);
    console.log(postdata.gender);
    console.log(postdata.birthdate);

    if (!postdata.email || !postdata.password) {
    res.redirect('/register?err=val');
    } else {
        request(requestOptions, function(err, response, body) {
                if (err) {
                    console.log(err);
                } else if (response.statusCode === 201) { //Success
                    res.redirect('/login');
                } else if (response.statusCode === 400 && body.email && body.email === "ValidationError" ) {
                    res.flash('danger', 'Invalid');
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
/*GET ------ PAGE NOT USED ATM*/
module.exports.editProfile = function(req, res) {
    res.render('editProfile', {
        title: 'Edit Profile',
        user: req.user
    });
};

/*POST*/
module.exports.editProfilePOST = function(req, res) {
    var path, putdata, requestOptions;
    console.log(" ----------------> request body server: ", req.body);
    path = "/api/profile/"+req.user.id;
    putdata = {
        street: req.body.street,
        city: req.body.city,
        country: req.body.country,
        interest1: req.body.interest1,
        interest2: req.body.interest2,
        interest3: req.body.interest3,
        gym: req.body.gym,
        about: req.body.about
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "PUT",
        json: putdata
    };
    request(requestOptions, function(err, response, body) {
        if (err) {
            console.log(err);
        } else if (response.statusCode === 200) { //Success
            res.redirect('/profile/'+req.user.id);
        } else if (response.statusCode === 400 ) {
            res.flash('danger', 'Invalid');
            res.redirect('/profile?err=val');
        } else {
            console.log(body);
            _showError(req, res, response.statusCode);
        }
    });
};



/*GET*/
module.exports.profile = function(req, res) {
  var x = new Date(req.user.birthdate);
  var year = x.getFullYear();
  var month = x.getMonth()+1;
  var dt = x.getDate();

  if (dt < 10) {
  dt = '0' + dt;
  }

  if (month < 10) {
  month = '0' + month;
  }
  x = year + '-' + month + '-' + dt;

  res.render('profile', {
      title: 'Profile',
      user: req.user,
      birthdate: x
  });
};
