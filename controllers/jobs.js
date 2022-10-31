const { execute } = require('../lib/db');

const getJobsList = async (req, res) => {
  const results = await execute('SELECT * FROM jobs_logs');
  res.status(200).json(results);
};

module.exports = {
  getJobsList,
};
