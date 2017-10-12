var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 引入session模块
var session = require('express-session');


// 引入的是路由配置模块
var index = require('./routes/index');
var users = require('./routes/users');



// 我们的项目就是express的项目
var app = express();

// view engine setup // 视图引擎设置
app.set('views', path.join(__dirname, 'views')); // 视图引擎的路径
app.set('view engine', 'ejs'); // 视图引擎的类型为ejs/jade

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
	secret:'recommend 128 bytes random string', //加密的随机字符串
	cookie: { maxAge: 20 * 60 * 1000 }, //设置session的过期时间
	resave: true, //如果来了一个新的请求，不管原来在不在，我都给你新生成一个
	saveUninitialized: true //能够存储原来一些未初始化的session
}));

// 使用路由模块
app.use('/', index);
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

module.exports = app;
