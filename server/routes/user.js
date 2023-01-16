const express =require("express")
const {register,home, login} = require("../controller/user")
const router= express.Router()

//register link

router.route("/register").post(register)

//home link

router.route("").get(home)

//login route

router.route("/login").get(login)



module.exports=router