const router = require('express').Router();
const auth   = require('./verifyToken.js');

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
router.post('/login' , IsUserExisting ,checkPassword , loginCtrl);

module.exports = router;
