const router = require('express').Router();
const {isAuth} = require('../../middleware/user.js');
const {isAdmin} = require('../../lib/userUtils.js');
const Role   = require('../../model/Role');

router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/test/register">register</a></p>');
});


router.get('/login', (req, res, next) => {

    const form = '<h1>Login Page</h1><form method="POST" action="/api/user/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});



router.get('/register', async (req, res, next) => {
    const admin = isAdmin(req.user.role);
    let form;
    if(!admin){
      form = '<h1>Register Page</h1><form method="post" action="/api/user/register">\
                      Enter Username:<br><input type="text" name="username">\
                      <br>Enter Password:<br><input type="password" name="password">\
                      <br>Enter Email:<br><input type="email" name="email">\
                      <br><br><input type="submit" value="Submit"></form>';
    }else{
      const roles = await Role.find({});
      form = '<h1>Admin Register Page</h1><form method="post" action="/api/user/register">\
                      Enter Username:<br><input type="text" name="username">\
                      <br>Enter Password:<br><input type="password" name="password">\
                      <br>Enter Email:<br><input type="email" name="email">\
                      <br><br><input type="submit" value="Submit">\
                      <select name="role">'
                      for(let i=0; i < roles.length;i++) {
                      form += '<option value='+roles[i].role+'>'+roles[i].role+'</option>' ;
                      }
                      form += '</select>';
                      form += '</form>';
    }


    res.send(form);

});


router.get('/protected-route',isAuth,(req, res, next) => {
    // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
    return res.send('<h1>You are authenticated</h1><p><a href="/test/logout">Logout and reload</a></p>');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/test/protected-route');
});
//End test

router.post('/role' , async (req , res) => {
  console.log(req.body);
  const role = new Role({
    role : req.body.name,
  });
  console.log(role);

  try {
    const savedRole = await role.save();
    return res.json(savedRole);
  } catch (e) {
    res.json(e)
  }
});

router.get('/login-success', (req, res, next) => {
    return res.send('<p>You successfully logged in. --> <a href="/test/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});
module.exports = router;
