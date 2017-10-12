var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
//router 不同的path地址，跳转不同页面，因为后缀.ejs已经在app.js里面预设好了这里必须去掉
router.get('/', function(req, res, next) {

	console.log(req.session.email)
  res.render('index', { title: 'I like Express',email:req.session.email }); // render(渲染)
});

router.get('/login', function(req, res, next) {
  res.render('login',{});
});

router.get('/register', function(req, res, next) {
  res.render('register',{});
});


router.get('/ab*cd', function(req, res, next) {
	console.log('html---------->')
  res.send('路由正则匹配');
});

router.get('/html', function(req, res, next) {
	// send/sendFile
  res.sendFile(path.join(__dirname,'../package.json'));
});



router.get('/logout', function(req, res, next) {
  // 方法一
  // req.session.email = undefined;

  // 方法二
  req.session.destroy(function(err){
     res.redirect('/');
     //这里摧毁res.session ,将res的指针强转到./.可以让页面跳转到起始页，index。
  })
 
});


module.exports = router;
