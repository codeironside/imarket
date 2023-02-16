const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const USER = require("../model/user");

const protect = asynchandler(async (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    try {
      //get token from header
      
      token = req.headers.authorization.split(" ")[1];
      
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      
      //get user from the token;
      req.staff = await USER.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorize");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});
//how to get the stock data of Tesla in javascript?
module.exports = { protect };
