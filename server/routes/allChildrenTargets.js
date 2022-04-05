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
    fromMidnight.setHours(0, 0, 0, 0);
    const toMidnight = new Date();
    toMidnight.setHours(24, 0, 0, 0);

    const allMeasurementPolarQuestions = await pool.query(
      'SELECT * FROM measurementPolarQuestions WHERE measurement_created >= $1 AND measurement_created < $2',
      [fromMidnight.toISOString(), toMidnight.toISOString()]
    );

    console.log(allMeasurementPolarQuestions.rows);

    //select * from termin where DATE(dateTimeField) >= CURRENT_DATE AND DATE(dateTimeField) < CURRENT_DATE + INTERVAL '1 DAY'

    console.log(Date.now());
    const promises = allTargets.rows.map(async (target) => {
      switch (target) {
        case 'yes/no':
          const allMeasurementPolarQuestions = await pool.query(
            'SELECT * FROM measurementPolarQuestions WHERE target_id = $1 AND measurement_closed = FALSE',
            [target.target_id]
          );

          break;
      }

      return {
        target: target,
        measurement: allMeasurementPolarQuestions.rows,
      };
    });

    const result = await Promise.all(promises);

    res.json(allTargets.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
