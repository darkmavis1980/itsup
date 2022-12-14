require('dotenv').config();
require('../typedef');
const fs = require('fs/promises');
const path = require('path');
const JobsService = require('../server/services/jobs');
const { checkTableExists, runMigrations } = require('./lib/utils');
/**
 * Save a job if doesn't exist in the database
 * @param {Job} Job Object
 * @throws an error if fails
 */
const saveJob = async ({key, cron, url, method}) => {
  // check if exists already
  try {
    const jobExists = await JobsService.getOneByKey(key);
    if (!jobExists) {
      await JobsService.create({key, cron, url, method});
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

/**
 * Try to check if the jobs.json file exists, if it does it will load it and try to import the data from it
 * @returns {boolean} True
 */
const loadJsonJobs = async () => {
  const fileName = 'jobs.json';
  const filePath = path.resolve(__dirname, fileName);
  console.log('Checking if jobs.json exists...');
  if (fs.access(filePath)){
    console.log('File found, preloading data...');
    const fileData = await fs.readFile(filePath, { encoding: 'utf8'});
    const jsonData = JSON.parse(fileData);
    const { jobs } = jsonData;
    for (const job of jobs) {
      await saveJob(job);
      console.log(`- Saved job ${job.key}`);
    }
  }
  console.log('All jobs imported!');
  return true;
};

/**
 * Init function
 */
const init = async () => {
  try {
    // Check jobs table
    console.log('Checking if table already exists...');
    if (await checkTableExists('jobs')) {
      throw new Error('Table jobs already exists');
    }

    if (await checkTableExists('jobs_logs')) {
      throw new Error('Table jobs_logs already exists');
    }

    if (await checkTableExists('migrations')) {
      throw new Error('Table migrations already exists');
    }

    console.log('None found, creating tables in the DB');
    const migrations = await getMigrationsFiles();
    for (const migration of migrations) {
      await runMigrations(migration);
    }
    console.log('Tables created...')

    // loads jobs.json if found
    console.log('Preloading data from json');
    await loadJsonJobs();

  } catch (error) {
    console.log('Tables already in place, skipping installation');
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

init();