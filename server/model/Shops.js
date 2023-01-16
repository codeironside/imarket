const mongoose = require("mongoose");
const PRODUCT = mongoose.Schema(
  {
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
      },
    productName:{
      type: String,
      required: [true, "please add a name "],
    },
   price: {
      type: String,
    },
    QuantityAvailable: {
      type: String,
      required: [true, "please add a quantity"],
    },
 
    available: {
      type: Boolean,
      default: true,
      required: [true, "please specify a role"],
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
