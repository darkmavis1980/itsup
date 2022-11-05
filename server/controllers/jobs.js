const { execute } = require('../lib/db');
const express = require('express');
const Jobs = require('../classes/jobs');
const JobsService = require('../services/jobs');
const LogsService = require('../services/logs');

/**
 * Get the list of jobs from the database
 * @param {express.Request} req Request object
 * @param {express.Response} res Response object
 */
const getJobsLogs = async (req, res) => {
  try {
    const {
      limit = 100,
      offset = 0,
      timeframe = '1d',
    } = req.query;
    const results = await LogsService.list({limit, offset, timeframe});
    res.status(200).json(results).end();
  } catch (error) {
    res.status(403).json({message: error.message}).end();
  }
};

const getJobs = async (req, res) => {
  try {
    const result = await JobsService.list();
    res.status(200).json(result).end();
  } catch (error) {
    res.status(500).json({error: 'Could not load the jobs'}).end();
  }
}

/**
 * Get the jobs with latest logs
 * @param {express.Request} req Request object
 * @param {express.Response} res Response object
 */
const getJobsStatus = async (req, res) => {
  const keys = await JobsService.list();
  let rowSql;
  const rows = [];
  for(let i = 0; i < keys.length; i++) {
    rowSql = `SELECT * FROM jobs_logs WHERE jobs_id = '${keys[i].id}' ORDER BY created_at DESC LIMIT 1;`;
    const [row] = await execute(rowSql);
    rows.push(row);
  }
  res.status(200).json(rows).end();
};

/**
 * Get a job by its ID
 * @param {express.Request} req Request object
 * @param {express.Response} res Response object
 */
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

/**
 * Creates a job in the database
 * @param {express.Request} req Request object
 * @param {express.Response} res Response object
 */
const createJob = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(403).json({message: error.message}).end();
  }
};

/**
 * Updates a job in the database by its ID
 * @param {express.Request} req Request object
 * @param {express.Response} res Response object
 */
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

/**
 * Deletes a job in the database by its ID
 * @param {express.Request} req Request object
 * @param {express.Response} res Response object
 */
const deleteJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await JobsService.getOne(id);
    if (!job) throw new Error('Cannot find the job');

    // Delete the database entry
    const {affectedRows} = await JobsService.deleteJob(id);
    if (affectedRows === 0) throw new Error('No record deleted');

    // Delete the cronjob
    Jobs.deleteJob(job.name);

    res.status(204).end();
  } catch (error) {
    console.log(error.message);
    res.status(404).end();
  }
};

module.exports = {
  getJobs,
  getJobsLogs,
  getJobsStatus,
  createJob,
  updateJob,
  getJobById,
  deleteJobById,
};
