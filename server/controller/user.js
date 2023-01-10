const USER = require("../model/user")
const asyncHandler=require("express-async-handler")




const register = asyncHandler(async(req,res)=>{
    const { firstName, middlename, surname,email, password} = req.body
const user = await USER.create(firstName, middlename, surname ,email,password)
})


module.exports=register