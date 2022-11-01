const axios = require('axios');
const { CronJob } = require('cron');
const { query } = require('../lib/db');

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

  async addJob({key, cron, url, method}) {
    const jobInstance = new CronJob(
      cron,
      async () => {
        try {
          const {status} = await axios[method.toLowerCase()](url);
          await this.logJob(key, url, status);
        } catch (error) {
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
