var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    permissions: Array,
    facebookData: { type: Schema.Types.ObjectId, ref: 'FacebookData' },
    stripeData: Object
});

module.exports = mongoose.model('User', UserSchema );