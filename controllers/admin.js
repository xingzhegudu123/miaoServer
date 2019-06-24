var  UserModel  = require('../models/users.js')



// 控制层  客户端输入的




// 返回所有用户信息
var usersList = async(req, res, next) => {
	var result = await UserModel.usersList();
	if(result){
		 res.send({
	 	 msg : '所有用户信息',
	 	 status:0,
	 	 data:{
	 	 	usersList : result
	 	 }
	 });
	}else{
		 res.send({
	 	 msg : '获取用户信息失败',
	 	 status:0,
	 	
	 });
	}
};




// 冻结 账户
var updateFreeze = async(req, res, next) =>{
	var { email,isFreeze } = req.body;
	console.log(isFreeze);
	var result = await UserModel.updateFreeze(email, isFreeze);
	if(result){
		 res.send({
	 	 msg : '账号冻结操作成功',
	 	 status:0,
	 	
	 });
	}else{
		 res.send({
	 	 msg : '账号冻结操作失败',
	 	 status:-1,
	 	
	 });
	}
};


var deleteUser = async(req, res, next) =>{
	var { email } = req.body;
	var result = await UserModel.deleteUser(email);
	if(result){
		 res.send({
	 	 msg : '账号删除成功',
	 	 status:0,
	 	
	 });
	}else{
		 res.send({
	 	 msg : '账号删除失败',
	 	 status:-1,
	 	
	 });
	}
	
}



var index = async(req, res, next) =>{
	 res.send({
	 	msg : '管理员权限',
	 	status:0
	 });
};

module.exports ={
	index,
	usersList,
	updateFreeze,
	deleteUser
};
