require('dotenv').config();
require('../typedef');

const { getLatestMigrationSequence, getNewMigrationsFiles, runMigrations } = require('./lib/utils');

const init = async () => {
  const { sequence } = await getLatestMigrationSequence();
  const newMigrations = await getNewMigrationsFiles(sequence);

  if (newMigrations.length === 0) {
    console.info('Nothing to do');
    process.exit(0);
  }

  console.info('Running migrations...');
  for (const migration of newMigrations) {
    await runMigrations(migration);
  }

  console.info('Done!');
  process.exit(0);
}

init();
