/* eslint-disable no-console */
const { Pool } = require('pg');

const connectionString = require('./connectionString.js');

// update the connection string for the database you want
const db = new Pool({
  connectionString,
});

db.connect()
  .then(console.log('connected to database'))
  .catch((err) => console.log(err));

module.exports = db;
