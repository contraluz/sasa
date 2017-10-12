var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/test';



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/loginAction', function(req, res, next) {
 // 很明显，想要获取提交的参数
 // console.log(req.query.email,req.query.password);
 // res.send('get login success');


 var email = req.query.email;//get 请求用query. //而post用body.
 var password = req.query.password;



 MongoClient.connect(DB_CONN_STR,function(err,db){
 	if(err){
 		return;
 	}else{
 		var conn = db.collection('users');

 		var data = {email:email,password:password};
 		// conn.find(data,function(err,result){
 		// 	console.log(result)
 		// })

 		conn.find(data).toArray(function(err,result){
 			if(result.length>0){
 				
 				req.session.email = result[0].email;
 				res.redirect('/')
 				//res.send('登录成功')
 			}else{
 				res.send('登录失败');
 			}
 		})
 	}
 })



});

router.post('/registerAction', function(req, res, next) {
 // 很明显，想要获取提交的参数
 // console.log(req.body.email,req.body.password);
 // res.send('get register success');

 var email = req.body.email;
 var password = req.body.password;



 MongoClient.connect(DB_CONN_STR,function(err,db){
 	if(err){
 		return;
 	}else{
 		var conn = db.collection('users');

 		var data = {email:email,password:password};
 		conn.insert(data,function(err,result){
 			res.send('注册成功了')
 		})
 	}
 })






});



module.exports = router;
