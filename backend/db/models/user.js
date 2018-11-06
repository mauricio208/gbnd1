var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 13;

var UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    permissions: Array,
    facebookData: { type: Schema.Types.ObjectId, ref: 'FacebookData' },
    stripeData: Object
});

UserSchema.pre('save', function(next) {
    var user = this;
    console.log('unmodified pass: ',user.password);
    console.log('user.isModified:',user.isModified('password'))
    if (!user.password || !user.isModified('password')){
        return next();  
    } 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            console.log(hash);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch; 
};

module.exports = mongoose.model('User', UserSchema );