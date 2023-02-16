const mongoose = require("mongoose");
const PRODUCT = mongoose.Schema(
  {
    shopid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SHOP",
        required: true,
      },
    productName:{
      type: String,
      required: [true, "please add a name "],
      unique:true
    },
   price: {
      type: String,
    },
    QuantityAvailable: {
      type: String,
      required: [true, "please add a quantity"],
    },

    picture:{
        type:String,
        required:[true,"please add a picture"]
    },
    description:{
        type:String,
        required:[true,"please add a description"]
    }
   
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("PRODUCT", PRODUCT);
