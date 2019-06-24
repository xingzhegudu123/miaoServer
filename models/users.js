var mongoose = require('mongoose');
var url = require('url');
var { Head } = require('../untils/config.js');
mongoose.set('useCreateIndex',true);

var UserSchema = new mongoose.Schema({
	username: { type: String,   required : true , index : { unique :true }},
	password : {type : String,  required : true },
	email : { type: String,  required:true, index: { unique :true } },
	date : {type: Date,    default : Date.now()},
	isAdmin : {type : Boolean, default : false},
	isFreeze : {type : Boolean, default : false},
	userHead : { type:String,  default: url.resolve(Head.baseUrl,'qieai.png')}
	
});

var UserModel = mongoose.model('user',UserSchema);
UserModel.createIndexes(); // 让数据表中index生效

// 注册
var save = (data)=>{
	var user = new UserModel(data);
	return user.save()
	             .then(()=>{
	             	return true;
	             })
	             .catch(()=>{
	             	return false;
	             });
};



//  登录
var findLogin = (data)=>{
	return  UserModel.findOne(data);
};


// 忘记或 更新密码
var updatePassword = (email,password)=>{
	return  UserModel.update({email},{ $set: { password }   })
	    .then(()=>{
	    	return true;
	    })
	    .catch(()=>{
	    	return false
	    })
};


// 用户列表
var usersList = ()=>{
	return UserModel.find();
};


//  删除用户   email用来识别删除哪个用户
var deleteUser = (email)=>{
	return UserModel.deleteOne({ email });
}

// 根据用户名  修改头像
var updateUserHead =(username,userHead)=>{
		return  UserModel.update({username},{ $set: { userHead } })
	    .then(()=>{
	    	return true;
	    })
	    .catch(()=>{
	    	return false
	    })
}


// 冻结用户
var updateFreeze = (email,isFreeze)=>{
	return  UserModel.update({email},{ $set:{ isFreeze } })
	.then(()=>{
	    	return true;
	    })
	    .catch(()=>{
	    	return false
	    })
};

module.exports = {
	save,
	findLogin,
	updatePassword,
	usersList,
	updateFreeze,
	deleteUser,
	updateUserHead
}
