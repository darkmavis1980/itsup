const { getJobsList, getJobs } = require('../controllers/jobs');

module.exports = (app, express) => {
  let router = express.Router();

  router.get('/jobs/list', getJobsList);

  router.get('/jobs', getJobs);

  return router;
};
