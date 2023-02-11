const fs = require("fs");
const path = require("path");
const https = require("https");
const colors = require("colors");
const crypto = require("crypto");
const multer = require("multer");
const express = require("express");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const sessions = require("./middleware/sessions")
// const GridFsStorage = require("multer-gridfs-storage");
const { errorHandler } = require("./middleware/errormiddleware");



// const helmet = require("./middleware/helmet");
const app = express();
//port  number
const port = process.env.port || 3024;

const morgan = require("morgan");
const logger = require("./utils/logger");
const userlogger = require("./utils/userlogger");

//logger
app.use(morgan("tiny", { stream: logger.stream }));
// app.use(morgan('tiny', { stream: stafflogger.stream }));

connectDB();
// app.use(helmet);

//middlewares
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }
app.use(sessions)

app.use(express.json());
//TODO:sessions
app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride("_method"));

app.use("/user", require("./routes/user"));
app.use("/shops", require("./routes/shops"));
app.use("/products", require("./routes/product"))

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  logger.info(`server running on development`);
});
