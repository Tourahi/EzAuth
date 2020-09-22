const User = require('../model/User.js');
const bcrypt = require('bcryptjs');

const validPassword = (Username , Password) => {
  const user = await User.findOne( {username : Username} );
  const validPass = await bcrypt.compare(Password , user.password);
  if(!validPass) {
    return false;
  }
  return true;
}

module.exportes  = {
  validPassword,
}
