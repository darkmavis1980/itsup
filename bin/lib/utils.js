const fs = require('fs/promises');
const path = require('path');
const { execute } = require('../../server/lib/db');
const { MIGRATIONS_FOLDER } = require('../config');

/**
 * Query the database to see if the tables exists
 * @param {string} tableName The table to check
 * @returns {boolean} True if exists, false otherwise
 */
 const checkTableExists = async (tableName) => {
  try {
    const sql = `DESCRIBE ${tableName}`;
    await execute(sql);
    return true;
  } catch (error) {
    return false;
  }
};

const getSequenceFromFilename = fileName => fileName.substring(0, 3);

const addSequenceToMigrations = async (sequence) => {
  const sql = `INSERT INTO migrations (sequence) VALUES ('${sequence}')`;
  const { affectedRows } = await execute(sql);
  if (affectedRows === 0) throw new Error('Could not insert the migration');
  return true;
}

/**
 * Check a SQL file and tries to run a query against it's content
 * @param {string} fileName The SQL file to run
 * @returns {boolean} True regardless of the result
 */
const runMigrations = async (fileName) => {
  const filePath = path.resolve(__dirname, '../../', MIGRATIONS_FOLDER, fileName);
  const sequence = getSequenceFromFilename(fileName);
  const fileData = await fs.readFile(filePath, { encoding: 'utf8'});
  const queries = fileData.trim().split(';').map(query => query.trim());
  for (const sql of queries) {
    if (sql !== '') {
      console.log(`Executing migration file ${fileName}`);
      await execute(sql);
      await addSequenceToMigrations(sequence);
    }
  }
  return true;
};

const getLatestMigrationSequence = async () => {
  const sql = 'SELECT * FROM migrations ORDER BY created_at DESC, sequence DESC LIMIT 1';
  const result = await execute(sql);
  return result[0];
};

const getMigrationsFiles = async () => fs.readdir(path.resolve(__dirname, '../../', MIGRATIONS_FOLDER));

const getNewMigrationsFiles = async (currentSequence) => {
  const migrations = await getMigrationsFiles();
  const newMigrations = migrations.filter(migration => {
    const migrationSequence = Number(getSequenceFromFilename(migration));
    if (migrationSequence > currentSequence) {
      return true;
    }
    return false;
  });
  return newMigrations;
};

module.exports = {
  checkTableExists,
  runMigrations,
  getLatestMigrationSequence,
  getMigrationsFiles,
  getNewMigrationsFiles,
};