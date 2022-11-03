const {
  getJobsList,
  getJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJobById,
} = require('../controllers/jobs');

module.exports = (app, express) => {
  let router = express.Router();

  router.get('/jobs/list', getJobsList);

  router.get('/jobs/status', getJobs);

  router.get('/jobs/:id', getJobById);

  router.patch('/jobs/:id', updateJob);

  router.delete('/jobs/:id', deleteJobById);

  router.post('/jobs', createJob);


  return router;
};
