const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT user_first_name, user_last_name, user_email FROM users WHERE user_id = $1',
      [req.user]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
