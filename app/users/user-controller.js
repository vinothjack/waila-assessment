const User = require('../models/users-model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('../utils/jwt-helper');
const commonFunction = require('../utils/common');


exports.signup = async(req,res)=>{
    const body = req.body;
    const userExist = await User.findOne({
        where:{
            email:body.email,
            username:body.userName
        }
    })
    if(userExist){
        return res.status(422).json({
            success:false,
            message:'userName or email already exist'
        })
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(body.password, salt);
    const dataToWrite = {
        userName:body.userName,
        email:body.email,
        phonenumber:body.phonenumber,
        password:password

    }
    await User.create(dataToWrite)
    res.status(200).json({
        success:true
    })
}

exports.login = async(req,res)=>{
   const body = req.body;
   const userDetails = await User.findOne({
       where:{
        isActive: true,
        $or: [
            {email:body.userName},
            {userName:body.userName}
        ]
       }
   })

   if(userDetails){
        const compare = bcrypt.compareSync(body.password, userDetails.password);    
        if(compare){
            const token = jwt.encrypt({
                userId:userDetails.id
            })
        }else{
            return res.status(422).json({
                success:false,
                message:'Incorrect password'

            })
        }

   }else{
        return res.status(404).json({
          success:false,
          message:'user not found'
      })
   }
}
exports.getUserList = async(req,res)=>{
    const params = req.query;
    const offSet = commonFunction.calculateOffSet(params.page,params.limit);
    const findAlluserlist = await User.findAll({
        where:{
            isActive:true

        },
        offset:offSet,
        limit:params.limit

    })
    return res.status(200).json({
        success:true,
        data:findAlluserlist
    })
}
exports.getUserDetails = async(req,res)=>{
    const params = req.params;
    const findUserDetail = await User.findOne({
        where:{
            isActive:true,
            id:params.id
        }

    })
    return res.status(200).json({
        success:true,
        data:findUserDetail
    })
}
exports.update = async(req,res)=>{
    const body = req.body;
    const userDetail = await User.findOne({
        where:{
            id:body.id
        }
    })
    if(!userDetail){
        return res.status(422).json({
            success:false,
            message:'user not found'
        })
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(body.password, salt);
    const dataToWrite = {
        userName:body.userName,
        email:body.email,
        phonenumber:body.phonenumber,
        password:password

    }
    
    await User.update(dataToWrite,{
        where:{
            id:body.id
        }
    })
    res.status(200).json({
        success:true
    })
}
exports.delete = async(req,res)=>{
    await User.update({isActive:false},{
        where:{
            id:req.params.id
        }
    })
    res.status(200).json({
        success:true
    })
}