const mongoose= require('mongoose');
const User = require('../../../db/models/user');

describe('Password user encription on save',()=>{

    let connection;
    let db;
    let user;
    const uEmail = 'test@a.com';
    const uPass = '123test';

    beforeAll(async () => {
        console.log(global.__MONGO_URI__)
        connection = await mongoose.connect(global.__MONGO_URI__);

        var testUser = new User({
            email:uEmail ,
            password: uPass
        });
        await testUser.save();
        user = await User.findOne({ email: uEmail });
    });
        
    afterAll(async (done) => {
        mongoose.disconnect(done);
    });

    
    test('Encripted password string is different to plain password', async () => {
        
        expect(user.password).not.toEqual(uPass);
    });
    
    test('ComparePassword method verify that plain password is the same that encrypted password', async () => {
        rightPassword = await user.comparePassword(uPass);
        expect(rightPassword).toBeTrue();
    });
    
    test('ComparePassword method verify that altered plain password is not the same that encrypted password', async () => {
        wrongPassword = await user.comparePassword(uPass+'random');
        expect(wrongPassword).not.toBeTrue();
    });

});
