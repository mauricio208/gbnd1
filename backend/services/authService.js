const jwt = require('jsonwebtoken');
const User = require('../db/models/user');

function jwtSign(user,payload,expiresIn){
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { subject:String(user.id),
          expiresIn: expiresIn ?expiresIn:'1h' 
        }
    );
}

function jwtVerify(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}

async function userVerify(data){
    user = await User.findOne({ email: data.email });
    if(user && user.comparePassword(data.password)){
        let jwt = jwtSign(user,{});
        return {
            jwt:jwt,
            permissions:user.permissions
        };
    }
    return false;
}

module.exports={
    jwtSign,
    jwtVerify,
    userVerify
}