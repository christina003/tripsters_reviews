/* eslint-disable no-console */
const { Pool } = require('pg');

// update the connection string for the database you want
const connectionString = 'postgres://christinasantos:postgres@localhost:5432/reviews_service';

const db = new Pool({
  connectionString,
});

db.connect()
  .then(console.log('connected to database'))
  .catch((err) => console.log(err));

module.exports = db;
