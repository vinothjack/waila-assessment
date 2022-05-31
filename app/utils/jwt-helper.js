const jwt = require('jsonwebtoken')


exports.encrypt = (payload)=>{
    var token = jwt.sign(payload, 'my-app-secret');
    return token
}

exports.decrypt = (token)=>{
    try {
        var decoded = jwt.verify(token, '"my-app-secret');
        return {success: true,data:decoded}
    } catch (error) {
        return {success: false }
    }
}
