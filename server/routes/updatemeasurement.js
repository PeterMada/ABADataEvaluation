const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.put('/', authorization, async (req, res) => {
  const user_id = req.user;
  const child_id = req.headers['child_id'];
  const target_id = req.headers['target_id'];
  const target_type = req.headers['target_type'];
  const measuremend_id = req.headers['measurement_id'];
  const measuremend_type = 'normal';

  // TODO check if user can measure this target
  try {
    const measurment = await pool.query(
      'UPDATE measurements SET measurement_closed = TRUE WHERE measurement_id = $1 RETURNING measurement_id',
      [measuremend_id]
    );

    if (target_type) {
      if (target_type === 'yes/no') {
        const { answer } = req.body;

        const target = await pool.query(
          'UPDATE measurementPolarQuestions SET question_result = $1 RETURNING *',
          [answer]
        );
      }

      // Check if target baseline is completed
      const currentTarget = await pool.query(
        `SELECT * FROM targets 
          WHERE target_id = $1`,
        [target_id]
      );

      if (currentTarget.rows.length !== 1) {
        res.status(500).json('Server Error');
      }

      const currentProgram = await pool.query(
        `SELECT target_baseline_from, target_baseline_to 
          FROM programs 
          WHERE program_id = $1`,
        [currentTarget.rows[0].program_id]
      );

      if (currentProgram.rows.length !== 1) {
        res.status(500).json('Server Error');
      }

      const allMeasurments = await pool.query(
        `SELECT * FROM measurements AS m
      LEFT JOIN measurementPolarQuestions AS mp
      ON m.measurement_id = mp.measurement_id
      WHERE target_id = $1 AND m.measuremend_type= $3 ORDER BY m.measurement_created DESC 
      LIMIT $2`,
        [
          target_id,
          currentProgram.rows[0].target_baseline_to,
          measuremend_type,
        ]
      );

      let succesfulMeasurmentCount = 0;
      allMeasurments.rows.map((target) => {
        if (target.question_result) {
          succesfulMeasurmentCount++;
        }
      });

      // check if target is complete
      if (
        succesfulMeasurmentCount >=
        currentProgram.rows[0].target_baseline_from
      ) {
        // Baseline for target is succesfuly done
        // target do not go to session to next day
        // close target
        const measurment = await pool.query(
          `UPDATE targets 
              SET 
              target_complete = TRUE,
              target_completed_time = $2
              WHERE target_id = $1`,
          [target_id, new Date().toISOString()]
        );
      }

      res.json({ measrumentId: measurment.rows[0].measurement_id });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
