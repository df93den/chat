var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);


// var session = require('express-session');
// var SessionStore = require('express-mysql-session');
//
// var options = {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'test'
// }
//
// app.use(session({
//     key: 'session_cookie_name',
//     secret: 'session_cookie_secret',
//     store: new SessionStore(options)
// }))


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname+"\\client"));

app.get('/socket.io/socket.io.js', function (req, res) {
    res.sendFile(__dirname+"\\socket.io\\socket.io.js");
})

app.get('/', function (req, res) {
    res.sendFile(__dirname+"\\client\\index.html");
})


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


// io.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });


//
// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// var favicon = require('serve-favicon');
//
// server.listen(80);
//
//
// app.use(express.static(__dirname+"\\client"));
//
// app.get('/', function (req, res) {
//     res.sendfile(__dirname + '/index.html');
// });
//
// io.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });
//
//
//
//



module.exports = app;
