var express = require('express');
var router = express.Router();
var userController = require('../controllers/users.js');

var nodemailer = require('nodemailer');
var multer = require('multer');
var upload = multer({dest:'public/uploads/'});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',userController.login);
router.post('/register',userController.register);

router.get('/verify',userController.verify);
router.get('/logout',userController.logout);

router.get('/getUser',userController.getUser);
router.post('/findPassword',userController.findPassword);

// 图形验证码
router.get('/verifyImg',userController.verifyImg);
// 上传图片
router.post('/ubloadUserHead',upload.single('file'),  userController.ubloadUserHead);
//
//var mailTransport = nodemailer.createTransport({
//  host : 'smtp.qq.com',
//  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
//  auth : {
//      user : '931462140@qq.com',
//      pass : 'hjitrluzabyvbdea'
//  },
//});
//
//router.get('/send', function(req, res, next) {
//  var options = {
//      from        : '"你的名字" <931462140@qq.com>',
//      to          : '"用户1" <931462140@qq.com>',
//      // cc         : ''  //抄送
//      // bcc      : ''    //密送
//      subject        : '一封来自Node Mailer的邮件',
//      text          : '一封来自Node Mailer的邮件',
//      html           : '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>',
////      attachments : 
////                  [
////                      {
////                          filename: 'img1.png',            // 改成你的附件名
////                          path: 'public/images/img1.png',  // 改成你的附件路径
////                          cid : '00000001'                 // cid可被邮件使用
////                      },
////                      {
////                          filename: 'img2.png',            // 改成你的附件名
////                          path: 'public/images/img2.png',  // 改成你的附件路径
////                          cid : '00000002'                 // cid可被邮件使用
////                      },
////                  ]
//  };
//  
//  mailTransport.sendMail(options, function(err, msg){
//      if(err){
//          console.log(err);
//          res.render('index', { title: err });
//      }
//      else {
//          console.log(msg);
//          res.render('index', { title: "已接收："+msg.accepted});
//      }
//  });
//});






module.exports = router;
