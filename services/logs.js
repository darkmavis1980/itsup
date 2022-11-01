const { execute } = require('../lib/db');

const list = async ({
  limit = 100,
  offset = 0,
}) => {
  const sql = `SELECT * FROM jobs_logs LIMIT ${limit} OFFSET ${offset}`;
  const results = await execute(sql);
  return results;
};

module.exports = {
  list,
};
