var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.js');

//var nodemailer = require('nodemailer');

// 1 没有登录进不了管理员页面   2 登录了是普通用户也进不了
router.use(( req, res, next )=>{
	if(req.session.username && req.session.isAdmin){
		next();
	}else{
		res.send({
			msg: '没有管理权限',
			status: -1
		})
	}
})


router.get('/', adminController.index);
 
// 用户列表接口
router.get('/usersList', adminController.usersList);

 
// 冻结账户接口
router.post('/updateFreeze', adminController.updateFreeze);

router.post('/deleteUser', adminController.deleteUser);

module.exports = router;
