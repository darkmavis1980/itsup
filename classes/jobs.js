const axios = require('axios');
const { CronJob } = require('cron');
const { execute } = require('../lib/db');
const JobsService = require('../services/jobs');

axios.interceptors.request.use(config => {
  config.meta = {
    requestStartedAt: Number(Date.now())
  };
  return config;
});

axios.interceptors.response.use(config => {
  config.meta = {
    responseTime: Number(Date.now()) - config.config.meta.requestStartedAt
  };
  return config;
});


class Jobs {
  jobs;

  constructor() {
    this.jobs = {}
  }

  /**
   * Logs a job status in the database
   * @param {string} key A unique identifier for the job
   * @param {string} url The url to test
   * @param {string} status The HTTP status code of the response
   * @returns The response from the DB
   */
  async logJob(id, key, url, status, responseTime = 0) {
    const sql = `INSERT INTO jobs_logs (url, status, process_key, jobs_id, response_time) VALUES ('${url}', '${status}', '${key}', ${id}, ${responseTime})`;
    const results = await execute(sql);
    return results;
  }

  async load() {
    try {
      const results = await JobsService.list();
      if (results.length > 0) {
        results.forEach(({id, name: key, cron, url, method}) => this.addJob({id, key, cron, url, method}));
      }
    } catch (error) {
      console.error('Cannot load jobs from DB');
    }
  }

  async init() {
    /**
     * Loading jobs saved in DB
     */
    await this.load();
  }

  async addJob({id, key, cron, url, method}) {
    if (this.jobs[key]) {
      this.jobs[key].stop();
      delete this.jobs[key];
    }
    const jobInstance = new CronJob(
      cron,
      async () => {
        try {
          const {status, meta: { responseTime }} = await axios[method.toLowerCase()](url);
          await this.logJob(id, key, url, status, responseTime);
          console.log(`key:${key} - Pinged ${url} and got status ${status}, with response time of ${responseTime}ms`);
        } catch (error) {
          if (error?.response?.meta && error?.response?.status) {
            console.log(`key:${key} - Pinged ${url} and got status ${error?.response?.status}, with response time of ${responseTime}ms`);
            return this.logJob(id, key, url, error?.response?.status, error?.response?.meta?.responseTime || 0);
          }
          console.log('Operation cancelled')
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
    this.jobs[key].stop();
    delete this.jobs[key];
  }

  getJobs() {
    return this.jobs;
  }
}

const jobsInstance = new Jobs();

module.exports = jobsInstance;
