const jwt = require("jsonwebtoken")
const cookie=require('cookie-parser')

verifyToken=(req,res,next)=>{
    try{
        var token=req.cookies.user
        console.log(token)
        var decode =jwt.verify(token,'iamaayushisharma')
        req.userData=decode
        console.log(decode)
        next()
    }catch(err){
        console.log(err)
        res.send ({message:'invalid token'})
    }
}

module.exports = verifyToken
