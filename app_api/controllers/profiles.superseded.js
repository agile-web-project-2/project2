// require('../models/db');
// var mongoose = require('mongoose');
// var profile = mongoose.model('Profile');
//
// var sendJsonResponse = function(res, status, content) {
//     res.status(status);
//     res.json(content);
// };
//
// /* POST */
// // api/profiles
// module.exports.profilesCreate = function (req, res) {
//     profile.create({
//         username: req.body.username,
//         dateOfBirth: req.body.dateOfBirth,
//         gender: req.body.gender,
//         aboutMe: req.body.aboutMe,
//         coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
//         // Create arrays, split by comma.
//         interests: req.body.interests.split(","),
//         gymMemberships: req.body.gymMemberships.split(",")
//     // Supply Callback function providing success and failure
//     }, function(err, profile) {
//         if (err) {
//             sendJsonResponse(res, 400, err);
//         } else {
//             sendJsonResponse(res, 200, profile);
//         }
//     });
// };
//
// /* GET */
// // api/profiles/:userid     (try: localhost:3000/api/profiles/590f1cd3f36d281fc3b965c1)
// module.exports.profilesReadOne = function (req, res) {
//     if (req.params && req.params.userid) { //Check that profileid exists in the request parameters
//         profile
//             .findById(req.params.userid) //Get userid from URL parameters and give it to findById method.
//             .exec(function(err, profile) { //Define callback to accept possible parameters.
//                 if (!profile) {
//                     console.log("Return 404, no profile found")
//                     sendJsonResponse(res, 404, {
//                         "message": "profileid not found"
//                     });
//                     return;
//                 } else if (err) {
//                     console.log("Return 404, Mongoose has an error")
//                     sendJsonResponse(res, 404, err)
//                     return;
//                 }
//                 console.log("No errors in Mongoose, Send JSON doocument 200 response.")
//                 sendJsonResponse(res, 200, profile);
//             });
//     } else {
//         console.log("Return 404, parameters missing profileid")
//         sendJsonResponse(res, 404, {
//             "message": "No profileid in the request"
//         });
//     }
//
// };
// module.exports.profilesDeleteOne = function (req, res) {
//     sendJsonResponse(res, 200, {"status" : "success"});
// };
// module.exports.profilesUpdateOne = function (req, res) {
//     sendJsonResponse(res, 200, {"status" : "success"});
// };
// module.exports.profilesFindAlgorithm = function (req, res) {
//     sendJsonResponse(res, 200, {"status" : "success"});
// };
