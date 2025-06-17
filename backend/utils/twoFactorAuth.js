const speakeasy=require('speakeasy');
const generateSecret=()=>{
    return speakeasy.generateSecret({length:20})
}

const verifyToken =(secret,token)=>{
    return speakeasy.totp.verify({
        secret:secret.base32,
        encoding:'base32',
        token:token
    })
}
module.exports={generateSecret,verifyToken}