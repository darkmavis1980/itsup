const { getJobsList, getJobs, createJob, getJobById } = require('../controllers/jobs');

module.exports = (app, express) => {
  let router = express.Router();

  router.get('/jobs/:id', getJobById);

  router.get('/jobs/list', getJobsList);

  router.get('/jobs', getJobs);

  router.post('/jobs', createJob);

  return router;
};
