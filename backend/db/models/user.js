var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    names: String,
    email: String,
    password: String,
    facebook_data: { type: Schema.Types.ObjectId, ref: 'FacebookData' }
});

module.exports = mongoose.model('User', UserSchema );