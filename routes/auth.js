const router = require('express').Router();
const auth   = require('./verifyToken.js');
const passport = require('passport');
//Costume middleware
const {
  IsUserAlreadyExisting,
  IsUserExisting,
  checkPassword
} = require('../middleware/user.js');

const {registerCtrl , loginCtrl} = require('../controllers/auth.controller.js');

//Register
router.post('/register',IsUserAlreadyExisting , registerCtrl);
//Login
// router.post('/login' , IsUserExisting ,checkPassword , loginCtrl);
router.post('/login',IsUserExisting,checkPassword
            ,passport.authenticate('local',
            {
              failureRedirect: '/test/login-failure',
              successRedirect: '/test/login-success'
            }));

module.exports = router;
