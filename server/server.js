const https = require("https");
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const crypto = require("crypto");
const multer = require("multer");
const express = require("express");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
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

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride("_method"));

app.use("/user", require("./routes/user"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  logger.info(`server running on development`);
});
