const {
  getJobsList,
  getJobs,
  createJob,
  getJobById,
  updateJob,
} = require('../controllers/jobs');

module.exports = (app, express) => {
  let router = express.Router();

  router.get('/jobs/:id', getJobById);

  router.patch('/jobs/:id', updateJob);

  router.get('/jobs/list', getJobsList);

  router.get('/jobs/status', getJobs);

  router.post('/jobs', createJob);


  return router;
};
