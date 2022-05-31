const jwt = require ('./jwt-helper');

exports.authenticate = (req,res,next)=>{
    const token = req.header.Authorization
    const userData = jwt.decrypt(token)
    if(userData.success){
        req.userId = userData.data.userId
        next()
    }else{
        return res.status(400).json({
            success:false, 
            message:'user os not authorized'
        }
        )
    }
}
