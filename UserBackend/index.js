
const express = require('express')
const app = express()
const winston = require('winston');
const cors = require('cors');

const allowedOrigins = ['http://localhost:5174']; 

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

require('./startup/log')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 3000
app.listen(port,() => {
    winston.info(`Listeing to port ${port}`)
})