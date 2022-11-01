const axios = require('axios');
const { CronJob } = require('cron');
const { query, execute } = require('../lib/db');

class Jobs {
  jobs;

  constructor() {
    this.jobs = {}
  }

  async logJob(key, url, status) {
    const sql = `INSERT INTO jobs_logs (url, status, process_key) VALUES ('${url}', '${status}', '${key}')`;
    const results = await query(sql);
    return results;
  }

  async load() {
    try {
      const sql = `SELECT * FROM jobs`;
      const results = await execute(sql);
      if (results.length > 0) {
        results.forEach(job => this.addJob(job));
      }
    } catch (error) {
      console.error('Cannot load jobs');
    }
  }

  async addJob({key, cron, url, method}) {
    const jobInstance = new CronJob(
      cron,
      async () => {
        try {
          const {status} = await axios[method.toLowerCase()](url);
          await this.logJob(key, url, status);
          console.log(`Pinged ${url} and got status ${status}`);
        } catch (error) {
          console.log(`Pinged ${url} and got status ${error.response.status}`);
          await this.logJob(key, url, error.response.status);
        }
      },
      null,
      true,
      'America/Los_Angeles'
    );
    jobInstance.start();

    this.jobs[key] = jobInstance;
  }

  deleteJob(key) {
    delete this.jobs[key];
  }

  getJobs() {
    return this.jobs;
  }
}

module.exports = new Jobs();
