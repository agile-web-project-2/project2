var express = require('express');
var router = express.Router();
var ctrlProfiles = require('../controllers/profiles');
var ctrlMatches = require('../controllers/matches');
var ctrlAccounts = require('../controllers/accounts');
var chatController = require('../controllers/chat');
var chatRoutes = express.Router();

// profiles
router.post('/profiles', ctrlProfiles.profilesCreate);// Create new user profile
router.get('/profiles', ctrlProfiles.profilesFindAlgorithm);// Read list of profiles
router.get('/profiles/:userid', ctrlProfiles.profilesReadOne);// Read a specific user profile
router.put('/profiles/:userid', ctrlProfiles.profilesUpdateOne);// Update a specific user Profile
router.delete('/profiles/:userid', ctrlProfiles.profilesDeleteOne);// Delete a specific user profile
// chat variables
var ChatController = require('../controllers/chat');
var apiRoutes = express.Router();
var authRoutes = express.Router();
var chatRoutes = express.Router();

// // profiles
// router.post('/profiles', ctrlProfiles.profilesCreate);// Create new user profile
// router.get('/profiles', ctrlProfiles.profilesFindAlgorithm);// Read list of profiles
// router.get('/profiles/:userid', ctrlProfiles.profilesReadOne);// Read a specific user profile
// router.put('/profiles/:userid', ctrlProfiles.profilesUpdateOne);// Update a specific user Profile
// router.delete('/profiles/:userid', ctrlProfiles.profilesDeleteOne);// Delete a specific user profile

/***************************
*  'profile' API Controller
****************************/
router.post('/profile', ctrlProfiles.profilePOSTapi);// Adds new user profile
router.put('/profile/:userid', ctrlProfiles.profileUpdateOne);// Update user profile


/***************************
*  'matches' Controller
****************************/
router.post('/profiles/:userid/matchRequest/:matchid', ctrlMatches.matchesRequestAdd);// Create a new match request
router.delete('/profiles/:userid/matchRequest/:matchid', ctrlMatches.matchesRequestDelete);// Delete a specific match request
router.post('/profiles/:userid/matchAccept/:matchid', ctrlMatches.matchesAcceptAdd);// Create a new accepted match
router.delete('/profiles/:userid/matchAccept/:matchid', ctrlMatches.matchesAcceptDelete);// Delete a spcific accepted match

// matches
router.post('/profiles/:userid/matchRequest/:matchid', ctrlMatches.matchesRequestAdd);
// Create a new match request
router.delete('/profiles/:userid/matchRequest/:matchid', ctrlMatches.matchesRequestDelete);
// Delete a specific match request
router.post('/profiles/:userid/matchAccept/:matchid', ctrlMatches.matchesAcceptAdd);
// Create a new accepted match
router.delete('/profiles/:userid/matchAccept/:matchid', ctrlMatches.matchesAcceptDelete);
// Delete a spcific accepted match

/***************************
*   'chat' Controller
***************************/

// View messages to and from authenticated user
chatRoutes.get('/chat', chatController.getChats);
// Retrieve single conversation
chatRoutes.get('/chat/:chatId', chatController.getChat);
// Send reply in conversation
chatRoutes.post('/chat/:chatId', chatController.sendReply);
// Start new conversation
chatRoutes.post('/chat/new/:recipient', chatController.newChat);


module.exports = router;
