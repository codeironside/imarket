const bcrypt= require("bcryptjs")
const nodemailer= require("nodemailer")
const USER = require("../model/user");
const asyncHandler = require("express-async-handler");
const userlogger= require("../utils/userlogger")

//home page

const home = asyncHandler(async (req, res) => {
  if (!req.session.userid) {
    console.log(req.session.id);
    res.redirect("user/register");
  }
});

//@route GET/usersllogin
//desc login users
//access public
const login = asyncHandler(async (req, res) => {
  if (req.session.userid) {
    console.log(req.session.id);
    return res.redirect("/");
  }
  const { email, password } = req.body;

  const id = await USER.findOne({ email: email });
  if (id) {
    if (USER && bcrypt.compare(password, USER.password)) {
      req.session.userid = req.session.id;
      req.session.role = USER.role;
      const change = await USER.findByIdAndUpdate(
        id._id,
        { sessionStorage: req.session.id },
        { new: true }
      );
      if (change) {
        res.status(202).json({
          userid: req.session.userid,
          role: req.session.role,
          token: generateToken(id),
        });
      }
    }

    throw new Error("user not found");
  }
});





//@route POST/users/register
//desc register users
//access public
const register = asyncHandler(async (req, res) => {
  const { firstName, middlename, surname, email, password,phoneNumber } = req.body;

  const check = await USER.findOne({email:email})
  if(check){
    throw new Error("user exist")
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt)
  ;
  const user = await USER.create({
    firstName,
    middlename,
    surname,
    email,
    password: hashedpassword,
    phoneNumber
  });

  if(user){
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
  
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
  <p class="class">Dear ${firstName}.</p>,

 <div class="center"> <p class="class1">Welcome to IMARKET</p></br>
 
 <p class="center">your one-stop online marketplace for AFIT Kaduna. We are thrilled to have you on board and can't wait for you to </br>
 start browsing and buying from our wide selection of products and services. Our marketplace is designed to connect</br> 
 students, staff and faculty with a convenient and easy way to buy, sell and trade items within the school community</br>
  
  We understand that you have a lot of options when it comes to online marketplaces, and we are honored that you have chosen us.</br>
 We promise to provide you with an easy, convenient, and enjoyable shopping experience.</br>
  
  To get started, simply log in to your account using the email and password you provided during registration. From there, you can browse through our various categories, add items to your cart, and complete your purchase.</br>
  
  If you have any questions or need assistance, please don't hesitate to reach out to our customer support team. We are always here to help.</br>
  
  Thank you for choosing IMARKET. Happy shopping!</div>
  
  <p class="center">regards,</br></p> 
  <p class="center">The IMARKET Team</br></p>
  
  
  
  
  
  <a class="button" href="#">Explore the App</a>
</body>
</html>
  `;
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to IMARKET - Your Online Marketplace for AFIT Kaduna",
      html: html,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400);
        console.log(error);
        throw new Error("email not sent");
      } else {
        console.log("Email sent: " + info.response);
        userlogger.info(
          `Email sent to ${email}:${req.session.id}:250 - ${res.statusMessage}  - ${req.originalUrl} - ${req.method} - ${req.ip}-${info.response}`
        )
      
      }
      res.status(202).json({
        firstname:firstName,
        middleName:middlename,
  
      })
      userlogger.info(
        `${email} account created ${res.statusCode} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} `
      );
    });
  

  }


});


//@route GET/users/logout
//desc logout users
//access public
const logout = asyncHandler(async (req, res) => {
  req.session.destroy();
});
const generateToken = (id) => {
  jwt.sign(
    {
      data: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );
};

module.exports = { register, login, home };
