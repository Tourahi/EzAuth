const router = require('express').Router();
const auth   = require('../../routes/verifyToken.js');

router.get('/' ,auth,(req,res) => {
  res.send('Hello Post');
});

module.exports = router;
