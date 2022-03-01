const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'wert1189',
  host: 'localhost',
  port: 5432, //automatic run on this port
  database: 'ABADataEvaluation',
});

module.exports = pool;
