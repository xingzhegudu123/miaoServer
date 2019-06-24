var  crypto  = require('crypto');
var  captcha  = require('trek-captcha');

// 密码加密
var setCrypto = (info)=>{
	
    return crypto.createHmac('sha256', 'dggd3$#$%$*gff')
                   .update(info)
                   .digest('hex');

}

// 图形验证码
var createVerify = (req,res)=>{
   return captcha().then((info)=>{
		req.session.verifyImg =  info.token;
		return info.buffer
	}).catch(()=>{
		return false;
	});
}

module.exports={
	setCrypto,
	createVerify
}
