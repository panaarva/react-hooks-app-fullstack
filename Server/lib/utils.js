const jwt = require('jsonwebtoken');
const {privateKey} = require('./config');

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
    const rows = {rows: (response.rows) ? response.rows : {}};
    let authCode;
    authCode = jwt.sign(rows, privateKey);
    return authCode;
}
module.exports = {
    decode,
    encode
}
