const mysql = require('mysql2/promise');
const config = require('../config');

const connectDB = () => mysql.createConnection(config.db);

const execute = async (sql, params) => {
  const connection = await connectDB();
  const [results, ] = await connection.execute(sql, params);

  return results;
}

const query = async (sql) => {
  const connection = await connectDB();
  return connection.query(sql);
}

module.exports = {
  execute,
  connectDB,
  query,
}