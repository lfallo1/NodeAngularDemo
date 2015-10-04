var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy( /* optional params would go here */ function(username, password, done){
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                console.log('Unknown User');
                return done(null, false,{message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    console.log('Invalid Password');
                    return done(null, false, {message:'Invalid Password'});
                }
            });
        });
    }
));

router.get('/isLoggedIn', function (req, res, next) {
    console.log('checking if user is logged in...');
    res.send(req.isAuthenticated() ? req.user : undefined);
});

router.post('/', passport.authenticate('local'), function(req, res){
    console.log('Authentication Successful');
    res.json({'status' : 'success'});
});

module.exports = router;