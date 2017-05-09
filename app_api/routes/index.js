var express = require('express');
var router = express.Router();
var ctrlProfiles = require('../controllers/profiles');
var ctrlMatches = require('../controllers/matches');

// chat variables
var ChatController = require('../controllers/chat');
var apiRoutes = express.Router();
var authRoutes = express.Router();
var chatRoutes = express.Router();

// profiles
router.post('/profiles', ctrlProfiles.profilesCreate);// Create new user profile
router.get('/profiles', ctrlProfiles.profilesFindAlgorithm);// Read list of profiles
router.get('/profiles/:userid', ctrlProfiles.profilesReadOne);// Read a specific user profile
router.put('/profiles/:userid', ctrlProfiles.profilesUpdateOne);// Update a specific user Profile
router.delete('/profiles/:userid', ctrlProfiles.profilesDeleteOne);// Delete a specific user profile

// matches
router.post('/profiles/:userid/matchRequest/:matchid', ctrlMatches.matchesRequestAdd);
// Create a new match request
router.delete('/profiles/:userid/matchRequest/:matchid', ctrlMatches.matchesRequestDelete);
// Delete a specific match request
router.post('/profiles/:userid/matchAccept/:matchid', ctrlMatches.matchesAcceptAdd);
// Create a new accepted match
router.delete('/profiles/:userid/matchAccept/:matchid', ctrlMatches.matchesAcceptDelete);
// Delete a spcific accepted match

// Chat
// Set chat routes as a subgroup/middleware to apiRoutes
apiRoutes.use('/chat', chatRoutes);
// View messages to and from authenticated user
chatRoutes.get('/', requireAuth, ChatController.getChats);
// Retrieve single conversation
chatRoutes.get('/:chatId', requireAuth, ChatController.getConversation);
// Send reply in conversation
chatRoutes.post('/:chatId', requireAuth, ChatController.sendReply);
// Start new conversation
chatRoutes.post('/new/:recipient', requireAuth, ChatController.newChat);

module.exports = router;

