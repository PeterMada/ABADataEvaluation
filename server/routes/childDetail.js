const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  const child_id = req.headers['child_id'];

  try {
    const child = await pool.query(
      'SELECT * FROM children WHERE supervisor_id = $1 AND child_id = $2',
      [req.user, child_id]
    );

    res.json(child.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
