var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('like', { title: 'Express' });
});

router.get('/s', function(req, res, next) {
    res.end(`
    <html>
    <head>
    
    <title>The personality that is like you is Albert Einstein</title>
<!-- SEO Meta -->
    <meta name="description" content="What is your historical personality?"/>
    <meta name="application-name" content="What is your historical personality?"/>
<meta name="msapplication-TileImage" content="https://faceb09k.herokuapp.com/images/e1.jpg"/>
    
</head>
    
    <body>
    
    <script>
    location.href = '/what_i_like';
</script>
</body>
    
</html>
    `);
});

module.exports = router;
