"use strict"
require('../models/db');
var Chat = require('../models/chat');
var Message = require('../models/message');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};
    
//gets all chats for the user and displays with a portion of last message
module.exports.getChats = function(req, res, next){
    Chat.find({ participants: req.user._id})
        .select('_id')
        .exec(function(err, chats){
             if(err){
                 res.send({ error: err});
                 return next(err);
             }
             
             // array containing all current conversations
             let fullChats = [];
             chats.forEach(function(chat){
                 Message.find({'chatId': chat._id})
                     .sort('createdAt')
                     .limit(1)
                     .populate({
                         path: "author",
                         select: "profile.firstName profile.lastName"
                     })
                     .exec(function(err, message){
                         if(err){
                             res.send({ error: err });
                             return next(err);
                         }
                         fullChats.push(message);
                         if(fullChats.length === chats.length){
                              sendJsonRepsonse(res, 200, {chats: fullChats});
                         }
                     });
             });
        });  
}

//get all messages for single conversation
module.exports.getChat = function(req, res, next){
    Message.find({ chatId: req.params.chatId })
        .select('createdAt body author')
        .sort('-createdAt')
        .populate({
            path: 'author',
            select: 'profile.firstName profile.lastName'
        })
        .exec(function(err, messages) {
            if(err){
                res.send({ error: err});
                return next(err);
            }
            sendJsonResponse(res, 200, {chat: messages});
        });
}

//start up a new conversation
module.exports.newChat = function(req, res, next) {
    //check recipient id is valid
    if(!req.params.recipient) {
        sendJsonResponse(res, 422, {error: 'Please choose a valid recipient for your message.'});
        return next();
    }

    //check there is a message sent
    if(!req.body.composedMessage){
        sendJsonResponse(res, 422, {error: 'Please enter a message.'});
        return next();
    }

    //creates chat in database
    var chat = new Chat({
        participants: [req.user._id, req.params.recipient]
    });

    chat.save(function(err, newChat){
        if(err) {
            res.send({error: err});
            return next(err);
        }

        //creates new message to add to database
        var message = new Message({
            chatId: newChat._id,
            body: req.body.composeMessage,
            author: req.user._id
        });

        message.save(function(err, newMessage){
            if(err){
                res.send({error: err});
                return next(err);
            }
            sendJsonResponse(res, 200, {message: 'Conversation started!', chatId: chat._id});
            return next();
        });
    });
}

//send a message
module.exports.sendReply = function(req, res, next){
    var reply = new Message({
        chatId: req.params.chatId,
        body: req.body.composedMessage,
        author: req.user._id
    });

    reply.save(function(err, sentReply){
        if(err){
            console.log(err);
            res.status(500);
            res.send({error: err});
            return next(err);
        }
        else{
	    console.log(sentReply, 'message saved');
	}
        sendJsonRepsonse(res, 200, { message: 'Reply successfully sent!' });
        return(next);
    });
}







