/* GET 'matches' page */
module.exports.match = function(req, res) {
    res.render('findMatch', {
        title: 'Find A Match'
    });
};
