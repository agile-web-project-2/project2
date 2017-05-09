/* GET 'login' page */
module.exports.login = function(req, res) {
    res.render('login', {
        title: 'Login'
    });
};

/* GET 'register' page */
module.exports.register = function(req, res) {
    res.render('register', {
        title: 'Register'
    });
};

/* GET 'Edit Profile' page */
module.exports.editProfile = function(req, res) {
    res.render('editProfile', {
        title: 'Edit Profile'
    });
};
