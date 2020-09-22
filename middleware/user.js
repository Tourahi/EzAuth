const User = require('../model/User.js');
const bcrypt = require('bcryptjs');


const IsUserAlreadyExisting = async (req,res,next) => {
  //Checking if email exists
  const emailExist = await User.findOne({email : req.body.email});
  //Checking if username exists
  const usernameExist = await User.findOne({username : req.body.username});
  if (emailExist) {
    return res.status(400).send('Email already existing.');
  }else if (usernameExist) {
    return res.status(400).send('Username already existing.');
  }
  next();
}

const IsUserExisting = async (req , res, next) => {
  //Checking if email exists
  if(req.body.email) {
    const emailExist = await User.findOne({email : req.body.email});
    if (!emailExist) {
      return res.status(400).send('Incorrect Email.');
    }
  }
  //Checking if username exists
  if (req.body.username) {
    const usernameExist = await User.findOne({username : req.body.username});
    if (!usernameExist) {
      return res.status(400).send('Incorrect Username.');
    }
  }
  next();
}

const checkPassword = async (req ,res ,next) => {
  const user = await User.findOne( {username : req.body.username} );
  const validPass = await bcrypt.compare(req.body.password , user.password);
  if(!validPass) {
    return res.status(400).send('Incorrect password.');
  }
  next();
};


module.exports = {
  IsUserAlreadyExisting,
  IsUserExisting,
  checkPassword
}
