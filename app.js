const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routers = require("./src/routers");
const { globalErrorHandler } = require('./src/utils/error');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  app.get('/ping', function (req, res, next) {
    res.json({message : 'pong'})
  })

  app.use(routers);

  app.use(globalErrorHandler);

  return app;
};

module.exports = { createApp };