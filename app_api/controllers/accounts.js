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

/*PUT*/
/* Update user profile in database  */
module.exports.accountUpdateOne = function(req, res) {
    // var query = {'username': req.body.email};
    // var update = {gym: req.body.gym}
    // Account.findOneAndUpdate(query, update, options, function(err, account){
    //   if (err){
    //     console.log('we have an update error');
    //   };
    // });
    // Account.save(function(err){
    //   if(err)
    //     res.send(err);
    //     res.json({message: 'Gym info updated.'})
    // });

    //New account model object
    var account = new Account();
    Account.findById(req.body._id, function(err, account){
      if (err)
        res.send(err);

      //update
      account.gym = req.body.gym;

      //save
      account.save(function(err){
        if(err)
          res.send(err);

        res.json(account);
      });
    });
};
