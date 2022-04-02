const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  const target_id = req.headers['target_id'];
  let chidlDetails = [];

  try {
    // TODO check if loged usser can view this program

    const targetDetail = await pool.query(
      'SELECT * FROM targets WHERE  target_id = $1',
      [target_id]
    );

    res.json(targetDetail.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
