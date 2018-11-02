require('dotenv').config()
const authS = require('../../services/authService');
const jwt = require('jsonwebtoken');

describe('Auth Services',()=>{
    const payload = {test:'This is a test'}
    const user = {id:101}
    const mockSecret = 'SECRET123HAAJAHJSoafdafda'
    const token = authS.jwtSign(user,payload)
    test('JWT sign', () => {
        expect(authS.jwtSign(user,payload)).toBeString();
    });

    test('JWT verify different secret', ()=>{
        badToken = jwt.sign(
            payload,
            mockSecret,
            { subject:String(user.id),
              expiresIn:'1h' 
            }
        );
        expect(()=>authS.jwtVerify(badToken)).toThrowError(jwt.JsonWebTokenError)
    })

    test('JWT verify payload', ()=>{
        expect(authS.jwtVerify(authS.jwtSign(user,payload))).toMatchObject(payload)
    })

})
