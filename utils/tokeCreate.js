const jwt = require('jsonwebtoken');

exports.CreateToken=function(obj,secret){

    var token = jwt.sign(obj,secret,{
        algorithm: "HS256",
        expiresIn: "60d",
    });
    return token;

}