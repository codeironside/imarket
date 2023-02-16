const mongoose = require("mongoose");
const SHOP = mongoose.Schema(
  {
    ownersid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    shopid: {
      type: String,
      required: [true, "please add the id"],
      unique: true,
    },
    shopName: {
      type: String,
      required: [true, "please add a name "],
    },
    address: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "please add a quantity"],
    },

    openTime: {
      type: Date,
      required: [true, "please specify an opening time"],
    },
    closingTime: {
      type: Date,
      required: [true, "please specify a closing tome"],
    },
    daysOpened: {
      type: String,
      required: [true, "please specify days opened"],
    },
    picture: {
      type: String,
      required: [true, "please add a picture"],
    },
    contactNumber: {
      type: String,
      required: [true, "please add a contact number "],
    },
    contactEmail: {
      type: String,
      required: [true, "please add a contact email"],
    },
    description: {
      type: String,
      required: [true, "please add a description"],
    },
    BankName:{
        type:String,
        required:[true,"please add a bank name"]
    },
    AccountNumber:{
        type:String,
        required:[true,"please add an Account Number"]
    }
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("SHOP", SHOP);
