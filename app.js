require("dotenv").config();        
const express = require('express');
const morgan = require('morgan');   
const cors = require('cors');   
const { globalErrorHandler } = require('./utils/error');    

const app = express();
const PORT = process.env.PORT;
//const routes = require('./routers');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
//app.use(routes);
app.use(globalErrorHandler);

app.get('/ping', function (req, res, next) {
    res.json({message : 'pong'})
  })

app.listen(PORT, () => { console.log(`Running on port ${PORT}`);});