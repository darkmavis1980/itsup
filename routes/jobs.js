const { getJobsList } = require('../controllers/jobs');

module.exports = (app, express) => {
  let router = express.Router();

  router.get('/jobs', getJobsList);

  return router;
};
