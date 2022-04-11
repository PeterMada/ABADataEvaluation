const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.post('/', authorization, async (req, res) => {
  const user_id = req.user;
  const child_id = req.headers['child_id'];
  const target_id = req.headers['target_id'];
  const target_type = req.headers['target_type'];

  // TODO check if user can measure this target
  try {
    const measurment = await pool.query(
      'INSERT INTO measurements (measuremend_by, target_id) VALUES ($1, $2) RETURNING measurement_id',
      [user_id, target_id]
    );

    if (target_type) {
      if (target_type === 'yes/no') {
        const { answer } = req.body;

        const target = await pool.query(
          'INSERT INTO measurementPolarQuestions (question_result, measurement_id) VALUES ($1, $2) RETURNING *',
          [answer, answerNo, measurment.measurement_id]
        );

        res.json({ measrumentId: measurment.rows[0].measurement_id });
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
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
