const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  const target_id = req.headers['target_id'];
  let chidlDetails = [];

  try {
    // TODO check if loged usser can view this program
    const secondTable = 'measurementPolarQuestions';

    const targetDetail = await pool.query(
      `SELECT m.*, ms.*, u.user_first_name, u.user_last_name FROM measurements AS m 
        LEFT JOIN ${secondTable} As ms 
        ON m.measurement_id = ms.measurement_id 
        LEFT JOIN users AS u
        On m.measuremend_by = u.user_id
          WHERE m.target_id = $1 
          ORDER BY m.measurement_created DESC`,
      [target_id]
    );

    console.log(targetDetail.rows);

    res.json(targetDetail.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
