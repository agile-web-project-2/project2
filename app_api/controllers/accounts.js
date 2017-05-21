var Account = require('../models/account');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


/*******************
*    /api/account
********************/
/*POST*/
/* Adds a new account to the database  */
module.exports.accountPOSTapi = function(req, res) {
    Account.register(new Account({
      username: req.body.email,
      name: req.body.name,
      gender: req.body.gender,
      birthdate: req.body.birthdate}), req.body.password,
        function(err, account) {
            if (err) {
                console.log('There was an error while registering the email!', err);
                console.log('account: ' + account);
                sendJsonResponse(res, 400, err);
            } else {
                console.log('The email is registered!');
                sendJsonResponse(res, 201, account);
            }

        });
};
