'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');
const { CronJob } = require('cron');
const { jobs } = require('./jobs.json');

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

if(nodeEnv !== 'dev'){
  app.use(morgan('dev'));
}// end if

app.get(API_BASE+'/version', (req, res) => {
  var version = require('./package.json').version;
  var data = {
    version
  }
  res.json(data);
});

jobs.forEach(({method, url, cron}) => {
  try {
    console.log('starting cron for ', url);
    const jobInstance = new CronJob(
      cron,
      async () => {
        const {status} = await axios[method.toLowerCase()](url);
        console.log(url, status);
      },
      null,
      true,
      'America/Los_Angeles'
    );
    jobInstance.start();
  } catch (error) {
    console.log('failed', error.response.status);
  }
})

// var job = new CronJob(
// 	'* * * * * *',
// 	function() {
// 		console.log('You will see this message every second');
// 	},
// 	null,
// 	false,
// 	'America/Los_Angeles'
// );

// job.start();

/**
 * Start the server
 */
http.listen(PORT, HOST, function(){
  console.log(`Server started at the address ${HOST}:${PORT}`);
});

module.exports = app;