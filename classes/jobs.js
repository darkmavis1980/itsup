const axios = require('axios');
const { CronJob } = require('cron');
const { execute } = require('../lib/db');
const JobsService = require('../services/jobs');
const { jobs: JSONJobs } = require('../jobs.json');

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
  async logJob(key, url, status) {
    const sql = `INSERT INTO jobs_logs (url, status, process_key) VALUES ('${url}', '${status}', '${key}')`;
    const results = await execute(sql);
    return results;
  }

  async load() {
    try {
      const results = await JobsService.list();
      if (results.length > 0) {
        results.forEach(job => this.addJob(job));
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
     this.loadJson();
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

const jobsInstance = new Jobs();

module.exports = jobsInstance;
