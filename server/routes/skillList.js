const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  try {
    const child_id = req.headers['child_id'];

    const child = await pool.query(
      'SELECT child_id FROM children WHERE supervisor_id = $1 AND child_id = $2',
      [req.user, child_id]
    );

    //TODO if can current user acces child

    const skils = await pool.query(
      'SELECT * FROM skills WHERE child_id = $1',
      [child_id]
    );

    res.json(skils.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
