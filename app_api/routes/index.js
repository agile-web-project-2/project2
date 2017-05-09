var express = require('express');
var router = express.Router();
var ctrlProfiles = require('../controllers/profiles');
var ctrlMatches = require('../controllers/matches');


/***************************
*  'profiles' Controller
****************************/
router.post('/profiles', ctrlProfiles.profilesCreate);// Create new user profile
router.get('/profiles', ctrlProfiles.profilesFindAlgorithm);// Read list of profiles
router.get('/profiles/:userid', ctrlProfiles.profilesReadOne);// Read a specific user profile
router.put('/profiles/:userid', ctrlProfiles.profilesUpdateOne);// Update a specific user Profile
router.delete('/profiles/:userid', ctrlProfiles.profilesDeleteOne);// Delete a specific user profile


/***************************
*  'account' Controller
****************************/
router.post('/account', ctrlAccounts.accountPOSTapi);// Adds new user account 


/***************************
*  'matches' Controller
****************************/
router.post('/profiles/:userid/matchRequest/:matchid', ctrlMatches.matchesRequestAdd);// Create a new match request
router.delete('/profiles/:userid/matchRequest/:matchid', ctrlMatches.matchesRequestDelete);// Delete a specific match request
router.post('/profiles/:userid/matchAccept/:matchid', ctrlMatches.matchesAcceptAdd);// Create a new accepted match
router.delete('/profiles/:userid/matchAccept/:matchid', ctrlMatches.matchesAcceptDelete);// Delete a spcific accepted match


module.exports = router;

