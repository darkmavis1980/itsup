const axios = require('axios');
const { CronJob } = require('cron');
const { jobs } = require('../jobs.json');
const { query } = require('../lib/db');

const logJob = async (key, url, status) => {
  const sql = `INSERT INTO jobs_logs (url, status, process_key) VALUES ('${url}', '${status}', '${key}')`;

  const results = await query(sql);
  return results;
}

const initJobs = async () => {
  jobs.forEach(({method, url, cron, key}) => {
    console.log('starting cron for ', url);
    const jobInstance = new CronJob(
      cron,
      async () => {
        try {
          const {status} = await axios[method.toLowerCase()](url);
          console.log(url, status);
          await logJob(key, url, status);
        } catch (error) {
          console.log(error)
          console.log('failed', error.response.status);
          await logJob(key, url, error.response.status);
        }
      },
      null,
      true,
      'America/Los_Angeles'
    );
    jobInstance.start();
  });
};

module.exports = {
  initJobs,
}