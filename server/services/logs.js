const { execute } = require('../lib/db');
const {
  getIntervalFromTimeframe,
} = require('../lib/utils');

const list = async ({
  limit = 100,
  offset = 0,
  timeframe = '1d'
}) => {

  const interval = getIntervalFromTimeframe(timeframe);

  const sql = `SELECT *
    FROM jobs_logs
    WHERE created_at >= NOW() - INTERVAL ${interval}
    LIMIT ${limit}
    OFFSET ${offset}`;
  const results = await execute(sql);
  return results;
};

module.exports = {
  list,
};
