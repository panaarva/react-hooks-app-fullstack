const jwt = require('jsonwebtoken');
const {privateKey} = require('./configs')
const decode = (authCode) => {
    let userInfo;
    try {
        userInfo = jwt.verify(authCode, privateKey);
    } catch (e) {
        userInfo = null;
        console.error(e);
    }
    return userInfo;
}
const encode = (response) => {
    let authCode;
    authCode = jwt.sign(response, privateKey);
    return authCode;
}
module.exports = {
    decode,
    encode
}