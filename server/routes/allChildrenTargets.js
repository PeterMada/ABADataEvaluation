const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  const child_id = req.headers['child_id'];
  const only_baseline = req.headers['only_baseline'];
  let chidlDetails = [];

  try {
    // TODO check if user can view this targets
    let allTargets;
    const fromMidnight = new Date();
    const toMidnight = new Date();
    fromMidnight.setHours(0, 0, 0, 0);
    toMidnight.setHours(24, 0, 0, 0);

    if (only_baseline) {
      allTargets = await pool.query(
        `SELECT *, (SELECT COUNT(*) FROM measurements AS m WHERE m.target_id = t.target_id
          AND m.measuremend_type = 'baseline') AS alreadyMeasured
          FROM targets AS t
          WHERE t.child_id = $1
            AND t.target_baseline_complete = FALSE`,
        [child_id]
      );
    } else {
      allTargets = await pool.query(
        `SELECT * FROM targets AS t
          WHERE t.child_id = $1
            AND target_baseline_complete = TRUE 
            AND NOT EXISTS 
            (SELECT * FROM measurements AS m 
              WHERE m.target_id = t.target_id AND measuremend_type != 'baseline'
              AND (m.measurement_created between $2 AND $3))`,
        [child_id, fromMidnight, toMidnight]
      );
    }
    res.json(allTargets.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
