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

    
    const promises = allTargets.rows.map(async (target) => {
      const allMeasurementPolarQuestions = await pool.query(
        'SELECT * FROM measurementPolarQuestions AS mpq LEFT JOIN frequency AS mf ON mf.target_id = mpq.target_id  WHERE mpq.target_id = $1 AND mpq.measurement_closed = FALSE',
        [target.target_id]
      );

      return {target: target, measurement: allMeasurementPolarQuestions.rows };
    });

    const result = await Promise.all(promises);

    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
