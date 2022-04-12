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
      `SELECT t.*, ms.* FROM targets AS t
        INNER JOIN measurements AS ms ON t.target_id = ms.target_id
          WHERE t.child_id = $1 
            AND (ms.measurement_created between $4 AND $5) 
            AND EXISTS 
              (SELECT * FROM measurements AS m 
                WHERE m.target_id = t.target_id 
                AND measurement_closed = FALSE
                AND (m.measurement_created between $2 AND $3))`,
      [child_id, fromMidnight, toMidnight, fromMidnight, toMidnight]
    );

    res.json(allTargets.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
