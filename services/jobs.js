const { jobs } = require('../jobs.json');
const Jobs = require('../classes/jobs');

const initJobs = async () => {
  Jobs.load();
  jobs.forEach(({method, url, cron, key}) => {
    Jobs.addJob({key, cron, url, method});
  });
};

module.exports = {
  initJobs,
}