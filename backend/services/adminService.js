const User = require('../db/models/user');

async function createUser(userData){
    let newUser = new User({
        name:userData.name,
        email:userData.email,
        password:userData.password,
        permissions:userData.permissions
    })
    return await newUser.save();
}

module.exports ={
    createUser
}