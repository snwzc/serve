const jwt = require('jsonwebtoken')
const { tokenTimeout, tokenKey } = require('../../config')



// jwt user Id  user name
function signToken(obj) {
    // if(!obj) return new 
    return jwt.sign(obj, tokenKey, { expiresIn: tokenTimeout })
}
// jwt verify
function verifyToken(token) {
    if (!token) return new Error('token not find')

    return new Promise((resolve, reject) => {
        jwt.verify(token, tokenKey, function (err, data) {
            if (err) reject(err)
            resolve(data)
        });
    })
}

module.exports = {
    signToken,
    verifyToken
}