const { execute } = require('../lib/db');

const getJobsList = async (req, res) => {
  const results = await execute('SELECT * FROM jobs_logs');
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
}

module.exports = {
  getJobsList,
  getJobs,
};
