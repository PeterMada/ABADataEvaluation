const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  const child_id = req.headers['child_id'];
  let chidlDetails = [];

  try {
    // TODO check if user can view this targets

    const allTargets = await pool.query(
      'SELECT * FROM targets WHERE  child_id = $1',
      [child_id]
    );

    const fromMidnight = new Date();
    const toMidnight = new Date();
    fromMidnight.setHours(0, 0, 0, 0);
    toMidnight.setHours(24, 0, 0, 0);

    let queryValues = [];
    queryValues.push(child_id);
    let poolValues = '';
    let k = 2;

    const promises = allTargets.rows.map(async (target, i) => {
      let measurmentTargets = [];

      switch (target.target_type) {
        case 'yes/no':
          const measurmentTargetsQuery = await pool.query(
            'SELECT * FROM measurementPolarQuestions WHERE target_id = $1 AND measurement_closed = FALSE AND measurement_created between $2 AND $3',
            [
              target.target_id,
              fromMidnight.toISOString(),
              toMidnight.toISOString(),
            ]
          );

          if (measurmentTargetsQuery.rows.length === 1) {
            queryValues.push(target.target_id);
            poolValues += ` OR target_id = $${k}`;
            k++;
          }
          break;
        case 'frequency':
          const measurmentFreqvency = await pool.query(
            'SELECT * FROM frequency WHERE target_id = $1 AND measurement_closed = FALSE AND measurement_created between $2 AND $3',
            [
              target.target_id,
              fromMidnight.toISOString(),
              toMidnight.toISOString(),
            ]
          );

          if (measurmentFreqvency.rows.length === 1) {
            queryValues.push(target.target_id);
            poolValues += ` OR target_id = $${k}`;
            k++;
          }

          break;
      }
    });

    const result = await Promise.all(promises);
    poolValues = poolValues.slice(3);
    console.log(poolValues);
    console.log(queryValues);

    const targetWhithTodayMeasurment = await pool.query(
      `SELECT * FROM targets WHERE child_id = $1 AND (${poolValues})`,
      queryValues
    );

    res.json(targetWhithTodayMeasurment.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
