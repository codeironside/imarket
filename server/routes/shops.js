const express =require("express")
const {registerproduct,home, login, payForprodct, registerShop, payForShop} = require("../controller/Shop")
const {protect}=require("../middleware/authmiddleware")
const router= express.Router()

//register link

router.route("/register").post(protect,registerShop)

//home link

router.route("").get(protect,home)

//login route

router.route("/login").get(payForprodct)



module.exports=router