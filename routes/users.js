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
    
    <title>The personality that is like you is Marie Taglioni</title>
<!-- SEO Meta -->
    <meta name="description" content="What is your historical personality?"/>
    <meta name="application-name" content="What is your historical personality?"/>
<meta name="msapplication-TileImage" content="/images/marii.jpg"/>
<meta property="og:image" content="/images/marii.jpg"/>
    
</head>
    <div>
    <img>
    <img src="/images/marii.jpg"></img>
   
    </div>
   
</body>
    
</html>
    `);
});

module.exports = router;
