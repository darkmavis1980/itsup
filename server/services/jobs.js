const { execute } = require('../lib/db');

const list = async () => {
  try {
    const sql = `SELECT * FROM jobs`;
    const results = await execute(sql);
    return results;
  } catch (error) {
    console.log(`Could not fetch the jobs from DB, reason: ${error.message}`);
  }
};

const getOne = async (id) => {
  try {
    const sql = `SELECT * FROM jobs WHERE id = ${id}`;
    const results = await execute(sql);
    return results[0];
  } catch (error) {
    console.log(`Could not fetch the jobs from DB, reason: ${error.message}`);
    throw error;
  }
};

const getOneByKey = async (key) => {
  try {
    const sql = `SELECT * FROM jobs WHERE name = '${key}'`;
    const results = await execute(sql);
    return results[0];
  } catch (error) {
    console.log(`Could not fetch the jobs from DB, reason: ${error.message}`);
    throw error;
  }
};

const create = async ({
  key,
  cron,
  url,
  method = 'HEAD',
  status = 'active',
}) => {
  try {
    const sql = `INSERT INTO jobs
      (name, cron, url, method, status)
      VALUES
      ('${key}', '${cron}', '${url}', '${method}', '${status}')`;
    const result = await execute(sql);
    return result;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Cannot save the ${key} job in the database`);
  }
};

const update = async ({
  id,
  cron,
  url,
  method,
  status,
}) => {
  try {
    const sql = `UPDATE jobs
      SET cron = '${cron}',
      url = '${url}',
      method = '${method}',
      status = '${status}'
      WHERE id = ${id}`;
    const result = await execute(sql);
    return result;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Cannot update the job:${id} in the database`);
  }
};

const deleteJob = async (id) => {
  try {
    const sql = `DELETE FROM jobs WHERE id = ${id}`;
    const result = await execute(sql);
    return result;
  } catch (error) {
    throw new Error(`Cannot delete the job:${id} in the database`);
  }
}

module.exports = {
  list,
  getOne,
  getOneByKey,
  create,
  update,
  deleteJob,
};