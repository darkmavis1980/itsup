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
  }
};

const create = async ({
  key,
  cron,
  url,
  method = 'HEAD',
}) => {
  try {
    const sql = `INSERT INTO jobs (name, cron, url, method) VALUES ('${key}', '${cron}', '${url}', '${method}')`;
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
}) => {
  try {
    const sql = `UPDATE jobs SET cron = '${cron}', url = '${url}', method = '${method}' WHERE id = ${id}`;
    const result = await execute(sql);
    return result;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Cannot update the job:${id} in the database`);
  }
}

module.exports = {
  list,
  getOne,
  create,
  update,
}