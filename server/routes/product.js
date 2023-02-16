const express = require("express")
const { registerProduct } = require("../controller/products")
const Router = express.Router()




Router.route("/register").post(registerProduct)


,module.exports=Router