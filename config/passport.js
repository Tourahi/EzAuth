const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User.js');
const {verifyCallback} = require('../controllers/auth.controller.js');

const strategy  = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user[0]._id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
