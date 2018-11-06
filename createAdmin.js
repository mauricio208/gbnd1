require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
cu = require('./backend/services/adminService')

async function ca(pass){
    await cu.createUser({
        name:'admin',
        email:'admin@growthbond.co',
        password:pass,
        permissions:['admin']
    });
    mongoose.disconnect(true);
}
console.log('pass: ',`"${process.argv[2]}"`)
ca(String(process.argv[2]));
