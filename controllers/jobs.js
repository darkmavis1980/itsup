const { execute } = require('../lib/db');
const Jobs = require('../classes/jobs');

const getJobsList = async (req, res) => {
  const {
    limit = 100,
    offset = 0,
  } = req.query;
  const sql = `SELECT * FROM jobs_logs LIMIT ${limit} OFFSET ${offset}`;
  const results = await execute(sql);
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

  const sql = `INSERT INTO jobs (name, cron, url, method) VALUES ('${key}', '${cron}', '${url}', '${method}')`;
  const result = await execute(sql);
  Jobs.addJob({
    key,
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
};
