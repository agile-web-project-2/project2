"use strict"
var Chat = require('../models/chat'),
    Message = require('../models/message'),
    User = require('../models/user');

exports.getChats = function(req, res, next){
    //displays one message from conversation
    Chat.find({ participants: req.user._id})
        .select('_id')
        .exec(function(err, chats){
             if(err){
                 res.send({ error: err});
                 return next(err);
             }
             
             // array containing conversation
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
                             return res.status(200).json({ chats: fullChats });
                         }
                     });
             });
        });  
}

exports.getChat = function(req, res, next){
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

            res.status(200).json({chat: messages });
        });
}

exports.newChat = function(req, res, next) {
    if(!req.params.recipient) {
        res.status(422).send({error: 'Please choose a valid recipient for your message.'});
        return next();
    }

    if(!req.body.composedMessage){
        res.status(422).send({error: 'Please enter a message.'});
        return next();
    }

    var chat = new Chat({
        participants: [req.user._id, req.params.recipient]
    });

    chat.save(function(err, newChat){
        if(err) {
            res.send({error: err});
            return next(err);
        }

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

            res.status(200).json({message: 'Conversation started!', chatId: chat._id});
            return next();
        });
    });
}

exports.sendReply = function(req, res, next){
    var reply = new Message({
        chatId: req.params.chatId,
        body: req.body.composedMessage,
        author: req.user._id
    });

    reply.save(function(err, sentReply){
        if(err){
            res.send({error: err});
            return next(err);
        }

        res.status(200).json({ message: 'Reply successfully sent!' });
        return(next);
    });
}




























