const {
  DB_HOST: dbHost,
  DB_USER: dbUser,
  DB_PASS: dbPass,
  DB_NAME: dbName,
} = process.env;

const config = {
  db: {
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
}

module.exports = config;
