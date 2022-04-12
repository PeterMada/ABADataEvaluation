const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  const measurement_id = req.headers['measurement_id'];
  const target_type = req.headers['target_type'];

  try {
    // TODO check if user can view this targets

    const fromMidnight = new Date();
    const toMidnight = new Date();
    fromMidnight.setHours(0, 0, 0, 0);
    toMidnight.setHours(24, 0, 0, 0);

    const measurmentDetail = await pool.query(
      `SELECT * FROM measurementPolarQuestions WHERE measurement_id = $1`,
      [measurement_id]
    );

    res.json(measurmentDetail.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
