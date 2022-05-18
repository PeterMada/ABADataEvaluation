const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  const child_id = req.headers['child_id'];
  let chidlDetails = [];

  try {
    // TODO check if user can view this targets

    const fromMidnight = new Date();
    const toMidnight = new Date();
    fromMidnight.setHours(0, 0, 0, 0);
    toMidnight.setHours(24, 0, 0, 0);

    const allTargets = await pool.query(
      `SELECT DISTINCT  t.*, ms.*, p.* FROM targets AS t
        LEFT JOIN programs AS p ON p.program_id = t.program_id
        INNER JOIN measurements AS ms ON t.target_id = ms.target_id
          WHERE t.child_id = $1 
            AND t.target_complete = FALSE
            AND t.target_baseline_complete = TRUE
            AND t.target_done_from_baseline = FALSE 
            AND EXISTS 
              (SELECT * FROM measurements AS m 
                WHERE m.target_id = t.target_id 
                AND m.measurement_closed = FALSE
                AND m.measuremend_type != 'baseline')`,
      [child_id]
    );

    res.json(allTargets.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
