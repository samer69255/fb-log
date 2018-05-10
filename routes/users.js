var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('like', { title: 'Express' });
});

router.get('/s', function(req, res, next) {
   res.render('like2',{})
});

module.exports = router;
