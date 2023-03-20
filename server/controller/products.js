const asyncHandler = require("express-async-handler");
const  PRODUCT = require("../model/product")
const SHOP = require("../model/shops")
const shopslogger = require("../utils/shopslogger")





//@desc get  all products related to a shop
//route shops/product/getall
//access public
const getallproduct = asyncHandler(async(req,res)=>{
  const {id}=req.staff
  const getall= await PRODUCT.find()
})


//@desc register product
//route products/register/
const registerProduct = asyncHandler(async (req, res) => {
  const {id}= req.staff
  const { productName, price,QuantityAvaliable,picture,description } = req.body;
const SHOP = await SHOP.findById(id)
  const product =   await PRODUCT.findOne ({productName:productName})

if(product){
  res.status(401)
  throw new Error("product already in stock")
}
const createproduct = await PRODUCT.create({
  shopid:SHOP._id, productName, price, QuantityAvaliable,picture,description
})

  if(createproduct){
    res.status(200).json({
      Message: `${productName} created `,
      productdetails:` ${productName}-${price}-${QuantityAvaliable}`
    })
    shoplogger.info(
      `shop with id :${shopid} created a product ${productName}  :${req.session.id}:250 - ${res.statusMessage}  - ${req.originalUrl} - ${req.method} - ${req.ip}-`
    );
  }
});


//desc pay for product
//@access private
//routes product/pay
const payForproduct= asyncHandler(async(req,res)=>{

})
module.exports = { registerProduct };
