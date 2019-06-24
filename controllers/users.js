var { Email,Head} = require('../untils/config.js')
var  UserModel  = require('../models/users.js')
var fs = require("fs")
var url = require("url")

var  { setCrypto, createVerify }  = require('../untils/base.js')


// 登录
var login = async(req, res, next) => {
      var  { username, password, verifyImg } = req.body;
      
      if(verifyImg!==req.session.verifyImg){
      	  res.send({
       	  	 msg:'验证码输入有误',
       	  	 status:-3
       	  });
       	  return;
      }
      
      
      var result = await UserModel.findLogin({
      	username,
      	password:setCrypto(password)
      });
      if(result){
      	  req.session.username =  username;
      	  req.session.isAdmin =  result.isAdmin;
      	  req.session.userHead = result.userHead;
      	  
      	  if(result.isFreeze){
      	  	 res.send({
       	  	 msg:'账户已冻结',
       	  	 status:-2
       	   });
      	  }else{
      	  	  res.send({
       	  	  msg:'登录成功',
       	  	 status:0
       	  });
      	 
      	  }
      	  
      
      }else{
      	  res.send({
       	  	 msg:'登录失败',
       	  	 status:-1
       	  });
      }
};

// 注册   验证码+时效性+邮箱
var register = async(req, res, next) => {
       var { username, password, email, verify } =  req.body;
       if(email != req.session.email|| verify != req.session.verify){
       	  res.send({
       	  	 msg:'验证码错误',
       	  	 status:-1
       	  });
       	  return;
       }
       
       // 当前时间--点发送验证码时的时间
       if( (Email.time - req.session.time)/1000>60){
       	   res.send({
       	  	 msg:'验证码已过期',
       	  	 status:-3
       	  });
       	  return;   // 不走后面 不会存入数据库
       }
       
       var result = await UserModel.save({
       	    username,
       	    password:setCrypto(password),
       	    email
       });
       
       if(result){
       	   res.send({
       	   	  msg : '注册成功',
       	   	  status : 0
       	   });
       }else{
       	   res.send({
       	   	   msg:'注册失败',
       	   	   status : -2
       	   });
       }
};

// 验证码
var verify = async(req, res, next) => {

	var email = req.query.email;
   var verify =  Email.verify;
   

// session保存邮箱和验证码
     req.session.verify = verify;
     req.session.email = email;
     req.session.time = Email.time;
     
     console.log(req.session.verify);
    // 要发送的配置
	var mailOptions = {
		from: 'Fred<931462140@qq.com>', // 发件人
		to: email, // 收件人
		subject: "喵喵网邮箱验证码", // 标题
		text: "验证码：" + verify, // 要发送的内容
		//	    html: "<b>Hello world?</b>" // html body
	};

	Email.transporter.sendMail(mailOptions, (err) => {
		if(err) {
			res.send({
				msg: '验证码发送失败',
				status: -1
			});
		} else {
			res.send({
				msg: '验证码发送成功',
				status: 0
			});
		}

	});

};

// 退出
var logout = async(req, res, next) => {
    req.session.username = '',
    res.send({
				msg: '退出成功',
				status: 0
			});
};


// 个人中心 (判断是否登录)
var getUser = async(req, res, next) => {
      
      if(req.session.username){
      	 res.send({
						msg: '获取用户信息成功',
						status: 0,
						data:{
							username: req.session.username,
							isAdmin: req.session.isAdmin,
							userHead: req.session.userHead,
						}
		    });
      }else{
      	 res.send({
						msg: '获取用户信息失败',
						status: -1
			});
    }
};

// 修改密码
var findPassword = async(req, res, next) => {
     var {email, password, verify} = req.body; // 用户输入的
     console.log(email,req.session.verify);
     if(email === req.session.email && verify === req.session.verify){
     	    var result =  await UserModel.updatePassword(email, setCrypto(password));
     	    if(result){
		     	    	 res.send({
								msg: '修改密码成功',
								status: 0,
					});
     	    }else{
     	    	  	 res.send({
								msg: '修改密码失败',
								status: -1,
					});
     	    }
     	    
     	    
     }else{
     	    res.send({
						msg: '验证码失败',
						status: -1,
			});
     }
};
//登录  图形验证码
var verifyImg = async(req, res, next)=>{
	var result  = await createVerify(req,res);
	if(result){
		   res.send(result);
	}
	
}

// 上传用户头像
var ubloadUserHead = async(req, res, next)=>{
//	 await fs.rename('public/uploads/'+ req.file.filename, 'public/uploads/' + req.session.username +'.png');
	 await fs.rename('public/uploads/'+req.file.filename, 'public/uploads/'+req.session.username+'.jpg',function(err){
	 	if(err){
    throw err;
 }
	 });
	
	   var result = await UserModel.updateUserHead(req.session.username, url.resolve(Head.baseUrl,req.session.username+'.jpg'));
//	console.log(req.file);
    if(result){
		    res.send({
								msg: '头像修改成功',
								status: 0,
								data : {
									 userHead: url.resolve(Head.baseUrl,req.session.username+'.jpg')
								}
									
					});
			}else{
				 res.send({
						msg: '头像修改失败',
						status: -1,
					
			});
			}
}






module.exports = {
	login,
	register,
	verify,
	logout,
	getUser,
	findPassword,
	verifyImg,
	ubloadUserHead
}