var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

var Mongoose = {
	url:'mongodb://localhost:27017/miaomiao',
	connect(){
		mongoose.connect(this.url,{useNewUrlParser:true},(err)=>{
			if(err){
				console.log('数据库连接失败');
				return;
			}
			console.log('数据库连接成功');
		});
		
	}
};

var Email = {
	config:{
	    host: "smtp.qq.com",
	    port: 587,
	  //  secure: false, // true for 465, false for other ports
	    auth: {
	      user: '931462140@qq.com', // 发件人
	      pass: 'hjitrluzabyvbdea' // 秘钥 wecppnbvlogmbffi
    }
	},
	// 创建一个发邮件的对象
	get transporter (){
		return nodemailer.createTransport(this.config);
	},
	get verify(){
		return Math.random().toString().substring(2,6); //四位验证码
	},
	get time(){
		return Date.now();
	}
};

var Head = {
	baseUrl : 'http://localhost:3000/uploads/'
}


module.exports = {
	Mongoose,
	Email,
	Head
}
