const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User.js');
const validPassword = require('../lib/passwordUtils.js').validPassword;


const verifyCallback = (username , password , done) => {
  User.find({username : username})
      .then((user) => {
        if(!user) return done(null, false)
        const isValid = validPassword(username , password);
        if(isValid) {
          return return done(null, user);
        }else{
          return done(null, false);
        }
      })
      .catch((err) => {
        done(err);
      });
};

const strategy  = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
