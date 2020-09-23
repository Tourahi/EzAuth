const User   = require('../model/User');
const bcrypt = require('bcryptjs');
const validPassword = require('../lib/passwordUtils.js').validPassword;

const authCtrl = {};

// Validation schemas
const {
  RegisterValidationSchema,
  LoginValidationSchema
} = require('../validations.js');


authCtrl.registerCtrl = async (req , res) => {
  //Validate the data
  const {error} =  RegisterValidationSchema.validate(req.body);
  if(error) return res.status(400).json({err : error.details[0].message});

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

// verifyCallback for the passport strategy
authCtrl.verifyCallback = (username , password , done) => {
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

authCtrl.loginSuccess = (req , res , next) => {
  res.status(200).json({ user : req.user});
};

authCtrl.loginFailure = (req , res , next) => {
  res.status(400).json({ err : 'You are not Authenticated'});
}

module.exports = authCtrl;
