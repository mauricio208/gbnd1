require('dotenv').config();
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
cu = require('./backend/services/adminService')
async function gp(pass){
    salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    user = await bcrypt.hash(pass, salt)
    return user;
}
async function ca(pass){
    password = await gp(pass);
    await cu.createUser({
        name:'admin',
        email:'admin@growthbond.co',
        password:password,
        permissions:['admin']
    });
    mongoose.disconnect(true);
}

ca(process.argv[2]);
