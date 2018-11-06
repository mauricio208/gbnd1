require('dotenv').config();
const mongoose = require('mongoose');
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];
const assert = require('assert')
const userModel = require('../db/models/user');
const fbDataModel = require('../db/models/facebookData');
const dataLength = 99
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

(async ()=>{
    let fbdata = []
    console.log('creating fb data');
    
    for (let index = 0; index < dataLength; index++) {
        let d = dummy(fbDataModel, {
            ignore: ignoredFields,
            returnDate: true
        });
        fbdata.push(d)
    }
    console.log('Insertinf fbdata');
    let fbdatasaved = await fbDataModel.insertMany(fbdata)
    console.log('creating users');
    
    let userdata = []
    for (const doc of fbdatasaved) {
        console.log(doc._id)
        let d = dummy(userModel, {
            ignore: ignoredFields,
            returnDate: true,
            ignore:["facebookData"]
        });
        console.log(d)
        d.facebookData = doc._id
        userdata.push(d)
    }
    console.log('Inserting users');
    
    userModel.insertMany(userdata, function(err,r) {
        // assert.equal(null, err);
        // assert.equal(100, r.insertedCount);
        // db.close();
    });
    console.log('finish');
    
})();
