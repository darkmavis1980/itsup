const {
  getJobs,
  getJobsLogs,
  getJobsStatus,
  createJob,
  getJobById,
  updateJob,
  deleteJobById,
} = require('../controllers/jobs');

module.exports = (app, express) => {
  let router = express.Router();

  router.get('/jobs/', getJobs);

  router.get('/jobs/logs', getJobsLogs);

  router.get('/jobs/status', getJobsStatus);

  router.get('/jobs/:id', getJobById);

  router.patch('/jobs/:id', updateJob);

  router.delete('/jobs/:id', deleteJobById);

  router.post('/jobs', createJob);

  return router;
};
