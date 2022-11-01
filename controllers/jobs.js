const { execute } = require('../lib/db');
const Jobs = require('../classes/jobs');
const JobsService = require('../services/jobs');
const LogsService = require('../services/logs');

const getJobsList = async (req, res) => {
  const {
    limit = 100,
    offset = 0,
  } = req.query;
  const results = await LogsService.list({limit, offset});
  res.status(200).json(results).end();
};

const getJobs = async (req, res) => {
  const sql = 'SELECT DISTINCT(process_key) FROM `jobs_logs`';
  const keys = await execute(sql);
  let rowSql;
  const rows = [];
  for(let i = 0; i < keys.length; i++) {
    rowSql = `SELECT * FROM jobs_logs WHERE process_key = '${keys[i].process_key}' ORDER BY created_at DESC LIMIT 1;`;
    const [row] = await execute(rowSql);
    rows.push(row);
  }
  res.status(200).json(rows).end();
};

const createJob = async (req, res) => {
  const {
    key,
    cron,
    url,
    method = 'HEAD',
  } = req.body;

  // Create job in the DB
  const result = JobsService.create({
    key,
    cron,
    url,
    method,
  });

  // Add Job to the cronJob scheduler
  Jobs.addJob({
    key,
    cron,
    url,
    method,
  });

  res.status(200).json(result).end();
};

const updateJob = async (req, res) => {
  const {
    id,
    cron,
    url,
    method = 'HEAD',
  } = req.body;

  // Create job in the DB
  const result = JobsService.update({
    id,
    cron,
    url,
    method,
  });

  res.status(200).json(result).end();
};

module.exports = {
  getJobsList,
  getJobs,
  createJob,
  updateJob,
};
