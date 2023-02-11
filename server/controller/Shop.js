const asyncHandler = require("express-async-handler");
const Flutterwave = require("flutterwave-node-v3");
const { PRODUCT } = require("../model/product");
const userlogger = require("../utils/userlogger");
const shoplogger = require("../utils/shopslogger");
var request = require("request");
const USER = require("../model/user");
const SHOP = require("../model/shops");
const nodemailer = require("nodemailer");
const https = require("https");

const home = asyncHandler(async (req, res) => {
  const { id } = req.staff;

  if (!id) {
    res.status(401);
    throw new Error("invalid credentials");
  }
  const user = await USER.findById(id);
  if (!user) {
    res.status(401);
    throw new Error("user not found ");
  }

  var options = {
    method: "GET",
    url: "https://api.flutterwave.com/v3/banks/NG",
    headers: {
      Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);

    const code = response.body;
    res.status(200).json({
      message: ` welcome ${user.firstName} `,
      code: response.body,
    });
  });
});

//@desc register new shop
//route /shop/register
//acess private
const registerShop = asyncHandler(async (req, res) => {
  if (!req.session.id) {
    res.redirect("user/login");
  }
  const { id } = req.staff;

  const userExist = await USER.findById(id);
  if (!userExist) {
    res.status(400);
    throw new Error("not an Authorized person");
  }

  const {
    shopName,
    shopid,
    address,
    openTime,
    closingTime,
    daysOpened,
    picture,
    contactNumber,
    contactEmail,
    description,
    BankName,
    AccountNumber,
  } = req.body;
const paystack=process.env.paystackkey
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/bank/resolve?account_number=0001234567&bank_code=058",
    method: "GET",
    headers: {Authorization: ` Bearer sk_live_c5c08c6dbb7b619d4a6677d2e4a838f23cb55f81`,},
  };

 await https
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  const d = new Date();
  const shop= await SHOP.findOne({shopid:shopid})
  if(shop){
    res.status(404)
    throw new Error("shop already Exist")
  }
  const created = await SHOP.create({
    ownersid: userExist._id,
    shopName,
    shopid,
    openTime: d.setHours(openTime),
    closingTime: d.setHours(closingTime),
    daysOpened,
    contactNumber,
    contactEmail,
    BankName,
    AccountNumber,
    picture,
    description,
    address,
  });
  if (created) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const link =
      "http://www.robertprice.co.uk/robblog/javascript_date_time_and_node_js-shtml/";

    const html = `
      <!DOCTYPE html>
  <html>
  <head>
    <style>
      /* Set the body background to the image */
      body {
        background-image:url('https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-open-book-education-day_23-2149241017.jpg?w=740&t=st=1672839251~exp=1672839851~hmac=250a8619cf050e204e19f685163952c48a928f250756df0e7e70c93e889369da') ;
        background-size: cover;
        background-repeat: no-repeat;
        font-family: sans-serif;
        color: white;
        text-align: center;
        padding: 50px;
      }
  
      /* Style the header */
      h1 {
          color:red;
        font-size: 48px;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
  
      /* Style the message */
      .class{
        font-size: 28px;
        font-family:comic-sans;
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
      .class1{
        font-size: 20px;
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
      .center{
        justify-content:center;
        align-self: flex-start;
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 17px;
        color: rgba(17, 17, 17, 0.87);
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)
      }
  
      /* Style the button */
      .button {
        display: inline-block;
        background-color: #3498db;
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        text-decoration: none;
        font-size: 18px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
    </style>
  </head>
  <body>
    <h1>Welcome to My IMARKET</h1>
    <p class="class">Dear ${userExist.firstName}.</p>,
  
   <div class="center"> <p class="class1">Welcome to IMARKET STORE</p></br>
   
   <p class="center"><p>Thank you for signing up as a vendor on iMarket, a marketplace for all your marketing needs! We're excited to have you onboard and can't wait for you to start listing your products and services for your customers to discover.</p><br>
   <br>
   <p>To get started, please log in to your account by visiting ${link}. Once logged in, you can access all the features of the platform, including creating and managing your listings, tracking your sales, and more.</p>
   <br>
   
   <p>We recommend that you fill out your vendor profile completely, and adding as many products/services as possible. This will help customers find your products and services easily. And also, you can use our analytics feature to track the performance of your products and services.</p>
   <br>
   <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team at ${process.env.email}. They're available 24/7 and will be more than happy to help you with anything you need.</p>
   <br>
   <p>Thank you again for choosing iMarket, and we look forward to helping you grow your business.</p>
   <br>

   
   Best,
   The iMarket Team
   
   
   
   
   </p></div>
    
    
    
    
    
    <a class="button" href="#">Explore the App</a>
  </body>
  </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL,
      to: contactEmail,
      subject: "YOU ARE NOW ON VENDOR",
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400);
        console.log(error);
        throw new Error("email not sent");
      } else {
        res.status(200).json({
          shopsname: shopName,
          ownersname: userExist.firstName,
          address: address,
          contactNumber: contactNumber,
          id: generateToken(id),
        });
        console.log("Email sent: " + info.response);
        userlogger.info(
          `${userExist.email} created shop with id ${shopid} :${req.session.id}:250 - ${res.statusMessage}  - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        shoplogger.info(
          `shop with id :${shopid} created by ${userExist.email}  :${req.session.id}:250 - ${res.statusMessage}  - ${req.originalUrl} - ${req.method} - ${req.ip}-`
        );
      }
    });
  }
});

const payForprodct = asyncHandler(async (req, res) => {});
const updateShop = asyncHandler(async (req, res) => {});

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );
};

module.exports = { home, registerShop, payForprodct };
