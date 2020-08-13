const jwt = require('jsonwebtoken');
const decode = (authCode) => {
    let privateKey = `kn0wled9e#1998`;
    let userInfo;
    try {
        userInfo = jwt.verify(authCode, privateKey);
    } catch (e) {
        userInfo = null;
        console.error(e);
    }
    return userInfo;
}
const incode = (response) => {
    let authCode;
    let privateKey = `kn0wled9e#1998`;
    authCode = jwt.sign(response, privateKey);
    return authCode;
}
module.exports = {
    decode,
    incode
}