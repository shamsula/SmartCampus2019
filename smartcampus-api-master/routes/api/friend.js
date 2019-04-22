var router         = require('express').Router();
var auth           = require('../auth');
var { Neode, Event, User, Comment, Friend} = require('../../models');
var utils          = require('../../utils');

router.post('/friendRequest', auth.required, function(req, res, next) {
    const userId = req.user.id;
   //TODO: Check if friend user already exists as friend 
    return User.first('email', req.body.email).then(user => {
        if(!user) {
            return res.status(404).json({errors: {title: "User with email " + req.body.email + " does not exist."}});
        } else {
            return User.findById(userId).then(you => {
                you.relateTo(user, 'has_requested').then((result) => {
                    res.json("Friend request to " + user.get('firstName') + " has been sent.")
                });
            });   
        }
    });
});
  
router.get('/friendRequest', auth.required, function(req, res, next) {
    const userId = req.user.id;  
    return User.findById(userId).then(user => {
        return res.json(utils.friendRequestResponse(user));  
    });
});

router.get('/', auth.required, function(req, res, next) {
    const userId = req.user.id;  
    return User.findById(userId).then(user => {
        return res.json(utils.friendListResponse(user));  
    });
});

router.post('/friendRequest/:id/accept', auth.required, function(req, res, next) {
    const userId = req.user.id;  
    const friendId = req.params.id;
    return User.findById(userId).then(user => {
        let request = null;
        let reqs = user.get('has_requests');
        reqs.forEach(req => {
            if(req.identity().toString() == friendId) {
                request = req;
            }
        });
        if(request) {
            return Neode.removeRelation(request, user, 'has_requested').then((resp) => {
                return user.relateTo(request, 'is_friend').then((result) => {
                    res.json("You are now friends with " + request.get('firstName'));
                });
            });      
        }
        else{
            return res.status(404).json({error: "Friend request not found!"});
        }
    });
});

router.post('/friendRequest/:id/decline', auth.required, function(req, res, next) {
    const userId = req.user.id;  
    const friendId = req.params.id;
    return User.findById(userId).then(user => {
        let request = null;
        let reqs = user.get('has_requests');
        reqs.forEach(req => {
            if(req.identity().toString() == friendId) {
                request = req;
            }
        });
        if(request) {
            return Neode.removeRelation(request, user, 'has_requested').then((resp) => {
                res.json("Friend request from " + request.get('firstName') + " declined.");
            });      
        }
        else{
            return res.status(404).json({error: "Friend request not found!"});
        }
    });
});

router.post('/unfriend/:id', auth.required, function(req, res, next) {
    const userId = req.user.id;  
    const friendId = req.params.id;
    return User.findById(userId).then(user => {
        let friend = null;
        let friends = user.get('is_friend');
        friends.forEach(f => {
            if(f.identity().toString() == friendId) {
                friend = f;
            }
        });

        if(!friend) {
            friends = user.get('is_friend_in');
            friends.forEach(f => {
                if(f.identity().toString() == friendId) {
                    friend = f;
                }
            });
        } 
        
        if(friend) {
            return Neode.removeRelation(user, friend, 'is_friend').then((result) => {
                res.json("You are no longer friends with " + friend.get('firstName'));
            });
        } else {
            return res.status(404).json({error: "Friend not found!"});
        }
    });
});

module.exports = router;