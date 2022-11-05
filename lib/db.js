const mysql = require('mysql2/promise');
const config = require('../config');

const connectDB = () => mysql.createConnection(config.db);

const execute = async (sql, params) => {
  const connection = await connectDB();
  const [results, ] = await connection.execute(sql, params);
  connection.end();
  return results;
}

const query = async (sql) => {
  const connection = await connectDB();
  const results = await connection.query(sql);
  connection.end();
  return results;
}

module.exports = {
  execute,
  connectDB,
  query,
}