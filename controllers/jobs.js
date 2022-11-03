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
  const keys = await JobsService.list();
  let rowSql;
  const rows = [];
  for(let i = 0; i < keys.length; i++) {
    rowSql = `SELECT * FROM jobs_logs WHERE process_key = '${keys[i].name}' ORDER BY created_at DESC LIMIT 1;`;
    const [row] = await execute(rowSql);
    rows.push(row);
  }
  res.status(200).json(rows).end();
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await JobsService.getOne(id);
    if (!job) throw new Error('Cannot find the job');
    res.status(200).json(job).end();
  } catch (error) {
    console.log(error.message);
    res.status(404).end();
  }
};

const createJob = async (req, res) => {
  const {
    name: key,
    cron,
    url,
    method = 'HEAD',
  } = req.body;

  // Create job in the DB
  const result = await JobsService.create({
    key,
    cron,
    url,
    method,
  });

  const { insertId } = result;

  // Add Job to the cronJob scheduler
  await Jobs.addJob({
    id: insertId,
    key,
    cron,
    url,
    method,
  });

  res.status(200).json(result).end();
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name: key,
      cron,
      url,
      method = 'HEAD',
    } = req.body;

    const jobExists = await JobsService.getOneByKey(key);
    if (!jobExists) {
      throw new Error('Job does not exists');
    }

    // Create job in the DB
    const { affectedRows } = await JobsService.update({
      id,
      cron,
      url,
      method,
    });

    if (affectedRows === 0) throw new Error('Nothing to update');
    // Replace Job to the cronJob scheduler
    Jobs.addJob({
      id,
      key,
      cron,
      url,
      method,
    });

    res.status(204).end();
  } catch (error) {
    res.status(400).end();
  }
};

module.exports = {
  getJobsList,
  getJobs,
  createJob,
  updateJob,
  getJobById,
};
