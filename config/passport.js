const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User.js');
const validPassword = require('../lib/passwordUtils.js').validPassword;

console.log(validPassword);
const verifyCallback = (username , password , done) => {
  User.find({username : username})
      .then(async (user) => {
        if(!user) return done(null, false)
        const isValid =  await validPassword(username , password);
        if(isValid) {
          return  done(null, user);
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
  // console.log("User id : ",user[0]._id);
    done(null, user[0]._id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
