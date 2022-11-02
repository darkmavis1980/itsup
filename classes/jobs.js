const axios = require('axios');
const { CronJob } = require('cron');
const { execute } = require('../lib/db');
const JobsService = require('../services/jobs');
const { jobs: JSONJobs } = require('../jobs.json');

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

  loadJsonOnStartup = false;

  constructor(loadJsonOnStartup = false) {
    this.jobs = {}

    this.loadJsonOnStartup = loadJsonOnStartup;
  }

  /**
   * Logs a job status in the database
   * @param {string} key A unique identifier for the job
   * @param {string} url The url to test
   * @param {string} status The HTTP status code of the response
   * @returns The response from the DB
   */
  async logJob(key, url, status, responseTime = 0) {
    const sql = `INSERT INTO jobs_logs (url, status, process_key, response_time) VALUES ('${url}', '${status}', '${key}', ${responseTime})`;
    const results = await execute(sql);
    return results;
  }

  async load() {
    try {
      const results = await JobsService.list();
      if (results.length > 0) {
        results.forEach(({name: key, cron, url, method}) => this.addJob({key, cron, url, method}));
      }
    } catch (error) {
      console.error('Cannot load jobs from DB');
    }
  }

  loadJson() {
    try {
      if (JSONJobs) {
        JSONJobs.forEach(job => this.addJob(job));
      }
    } catch (error) {
      console.error('Cannot load jobs from static file');
    }
  }

  init() {
    /**
     * Loading jobs saved in DB
     */
    this.load();

    /**
     * Deprecation Notice
     * This will load jobs from a static file, but it will be phased out soon
     */
    if (this.loadJsonOnStartup) {
      this.loadJson();
    }
  }

  async addJob({key, cron, url, method}) {
    if (this.jobs[key]) {
      this.jobs[key].stop();
      delete this.jobs[key];
    }
    const jobInstance = new CronJob(
      cron,
      async () => {
        try {
          const {status, meta: { responseTime }} = await axios[method.toLowerCase()](url);
          await this.logJob(key, url, status, responseTime);
          console.log(`key:${key} - Pinged ${url} and got status ${status}, with response time of ${responseTime}ms`);
        } catch (error) {
          console.log(`key:${key} - Pinged ${url} and got status ${error.response.status}, with response time of ${responseTime}ms`);
          await this.logJob(key, url, error.response.status, error.response.meta.responseTime);
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

const jobsInstance = new Jobs();

module.exports = jobsInstance;
