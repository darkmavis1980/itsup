'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const Jobs = require('./server/classes/jobs');

const {
  NODE_ENV: nodeEnv = 'dev',
  PORT = '7879',
  HOST = 'localhost',
  API_BASE = ''
} = process.env;

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(express.json());

/**
 * Allow CORS
 */
 app.use(cors());

if(nodeEnv === 'dev'){
  app.use(morgan('dev'));
}// end if

app.get(API_BASE+'/version', (req, res) => {
  var version = require('./package.json').version;
  var data = {
    version
  }
  res.json(data);
});

/**
 * Start jobs
 */
Jobs.init();

/**
 * Routes
 */
const jobsRouter = require('./server/routes/jobs')(app, express);

app.use(API_BASE, jobsRouter);

/**
 * Set static files location
 * used for requests that our frontend will make
 */
app.use('/ui/', express.static(__dirname + '/ui/dist'));

/**
 * Start the server
 */
http.listen(PORT, HOST, function(){
  console.log(`Server started at the address ${HOST}:${PORT}`);
});

module.exports = app;