const User   = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

const authCtrl = {};

// Validation schemas
const {
  RegisterValidationSchema,
  LoginValidationSchema
} = require('../validations.js');


authCtrl.registerCtrl = async (req , res) => {
  //Validate the data
  const {error} =  RegisterValidationSchema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password , salt);

  const user = new User({
    username : req.body.username,
    email    : req.body.email,
    password : hashedPassword,
    role     : req.body.role || 'basic'
  });
  try {
    const savedUser = await user.save();
    res.json({user : savedUser._id});
  } catch (e) {

  }
};

authCtrl.loginCtrl = async (req , res) => {
  //Validate the data
  const {error} =  LoginValidationSchema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Token assignement
  const user = await User.findOne( {username : req.body.username} );
  const token = jwt.sign({ _id : user } , process.env.TOKEN_SECRET);
  res.header('auth-token' , token).send(token);
  // res.send("You are loggedin !!");
}

module.exports = authCtrl;
