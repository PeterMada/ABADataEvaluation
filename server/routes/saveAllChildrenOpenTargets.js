const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.post('/', authorization, async (req, res) => {
  const child_id = req.headers['child_id'];
  let chidlDetails = [];

  try {
    // TODO check if user can view this targets
    const allTargets = await pool.query(
      'SELECT * FROM targets AS t WHERE t.child_id = $1',
      [child_id]
    );

    const promises = allTargets.rows.map(async (target, i) => {
      const skill = await pool.query(
        `UPDATE measurements 
          SET measurement_closed = TRUE 
            WHERE target_id = $1  
              AND measurement_closed = FALSE 
              RETURNING measurement_id`,
        [target.target_id]
      );
    });

    const result = await Promise.all(promises);

    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
