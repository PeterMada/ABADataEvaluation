const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.post('/', authorization, async (req, res) => {
  const user_id = req.user;
  const child_id = req.headers['child_id'];
  const target_id = req.headers['target_id'];
  const target_type = req.headers['target_type'];
  const measuremend_type = req.headers['measuremend_type']
    ? req.headers['measuremend_type']
    : 'normal';

  // TODO check if user can measure this target
  try {
    const measurment = await pool.query(
      'INSERT INTO measurements (measuremend_by, target_id, measuremend_type) VALUES ($1, $2, $3) RETURNING measurement_id',
      [user_id, target_id, measuremend_type]
    );

    if (target_type) {
      if (target_type === 'yes/no') {
        const { answer } = req.body;

        const target = await pool.query(
          'INSERT INTO measurementPolarQuestions (question_result, measurement_id) VALUES ($1, $2) RETURNING *',
          [answer, measurment.rows[0].measurement_id]
        );
      }

      /*
      if (target_type === 'frequency') {
        const { frequencyCount } = req.body;
        console.log(frequencyCount);
        const target = await pool.query(
          'INSERT INTO frequency (measurement_frequency, measuremend_by, target_id) VALUES ($1, $2, $3) RETURNING *',
          [frequencyCount, user_id, target_id]
        );

        res.json({ measrumentId: target.rows[0].measurement_id });
      }
      */

      // Check if target baseline is completed
      if (measuremend_type === 'baseline') {
        const currentTarget = await pool.query(
          `SELECT target_baseline_from, target_baseline_to 
        FROM targets 
        WHERE target_id = $1`,
          [target_id]
        );

        if (currentTarget.rows.length !== 1) {
          res.status(500).json('Server Error');
        }

        // get all baseline measurments for this target
        const allMeasurments = await pool.query(
          `SELECT * FROM measurements AS m
        LEFT JOIN measurementPolarQuestions AS mp
        ON m.measurement_id = mp.measurement_id
        WHERE target_id = $1 ORDER BY m.measurement_created DESC 
        LIMIT $2`,
          [target_id, currentTarget.rows[0].target_baseline_to]
        );

        let succesfulMeasurmentCount = 0;
        allMeasurments.rows.map((target) => {
          if (target.question_result) {
            succesfulMeasurmentCount++;
          }
        });

        // Baseline for target is done
        if (
          succesfulMeasurmentCount >=
          currentTarget.rows[0].target_baseline_from
        ) {
          const measurment = await pool.query(
            `UPDATE targets 
              SET target_baseline_complete = TRUE, target_baseline_completed_time = $2
              WHERE target_id = $1`,
            [target_id, new Date().toISOString()]
          );
        }
      }

      res.json({ measrumentId: measurment.rows[0].measurement_id });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
