var jwt = require('jsonwebtoken');

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

module.exports={
    jwtSign,
    jwtVerify
}