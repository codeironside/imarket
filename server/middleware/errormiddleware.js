const { stack } = require("../routes/user.js")
const userlogger = require("../utils/userlogger.js")



const errorHandler=(err,req,res,next)=>{
    const statusCode = res.statusCode? res.statusCode:500
    res.status(statusCode).json({
        Message:err.Message,
        stack:process.env.NODE_ENV === "production"? null: err.stack
    })
    userlogger.error(new Error(`${res.statusCode} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`));
    next()
}
module.exports={
    errorHandler,
}

