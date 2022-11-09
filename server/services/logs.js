const { execute } = require('../lib/db');
const {
  getIntervalFromTimeframe,
} = require('../lib/utils');

const list = async ({
  timeframe = '1d',
}) => {

  const interval = getIntervalFromTimeframe(timeframe);

  const sql = `SELECT *
    FROM jobs_logs
    WHERE created_at >= NOW() - INTERVAL ${interval}`;
  const results = await execute(sql);
  return results;
};

const listAll = async ({
  limit = 100,
  offset = 0,
}) => {
  const sql = `SELECT *
    FROM jobs_logs
    LIMIT ${limit}
    OFFSET ${offset}`;
  const results = await execute(sql);
  return results;
};

module.exports = {
  list,
  listAll,
};
