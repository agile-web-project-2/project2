/*require('../models/db');
var mongoose = require('mongoose');
var profile = mongoose.model('Profile'); 

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.activitiesListByDistance = function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: theEarth.getRadsFromDistance(20),
        num: 10
    };
    if (!lng || !lat) {
        sendJsonResponse(res, 404, {
"message": "lng and lat query parameters are required"
});
return;
}
// Check lng and lat
// query parameters
// exist in right
// format; return a
// 404 error and
// message if not
*/