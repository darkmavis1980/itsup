const { jobs } = require('../jobs.json');
const Jobs = require('../classes/jobs');

const initJobs = async () => {
  jobs.forEach(({method, url, cron, key}) => {
    Jobs.addJob({key, cron, url, method});
  });
};

module.exports = {
  initJobs,
}