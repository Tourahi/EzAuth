const router = require('express').Router();
const passport = require('passport');
//Costume middleware
const {
  IsUserAlreadyExisting,
  IsUserExisting,
  checkPassword
} = require('../middleware/user.js');

const {
  registerCtrl,
  loginSuccess,
  loginFailure
} = require('../controllers/auth.controller.js');

//Register
router.post('/register',IsUserAlreadyExisting , registerCtrl);

//Login
router.post('/login',IsUserExisting,checkPassword
            ,passport.authenticate('local',
            {
              failureRedirect: '/api/user/login-failure',
              successRedirect: '/api/user/login-success'
            }));

//loginSuccess
router.get('/login-success',loginSuccess);
//loginFailure
//if unexpected behavior otherwise it shall not run
router.get('/login-failure',loginFailure);

module.exports = router;
