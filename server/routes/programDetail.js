const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  const program_id = req.headers['program_id'];
  let chidlDetails = [];

  try {
    // TODO check if loged usser can view this program

    const programDetail = await pool.query(
      'SELECT * FROM programs WHERE  program_id = $1',
      [program_id]
    );

    const allTargetsFromProgram = await pool.query(
      'SELECT * FROM targets WHERE program_id = $1',
      [program_id]
    );

    res.json({
      programDetail: programDetail.rows[0],
      allTargets: allTargetsFromProgram.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
