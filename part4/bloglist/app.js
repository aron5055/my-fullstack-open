const express = require("express");
require("express-async-errors");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const config = require("./utils/config");
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogRouter");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected mongodb.");
  })
  .catch((error) => {
    logger.error(error);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
