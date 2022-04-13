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
      `SELECT * FROM targets AS t
        WHERE t.child_id = $1
          AND target_baseline_done = TRUE 
          AND NOT EXISTS 
          (SELECT * FROM measurements AS m 
            WHERE m.target_id = t.target_id 
            AND (m.measurement_created between $2 AND $3))`,
      [child_id, fromMidnight, toMidnight]
    );

    res.json(allTargets.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
