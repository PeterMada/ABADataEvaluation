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

    const targets = allTargetsFromProgram.rows.map(async (target, i) => {
      const secondTable = 'measurementPolarQuestions';

      const targetDetail = await pool.query(
        `SELECT m.*, ms.* FROM measurements AS m 
          LEFT JOIN ${secondTable} As ms 
          ON m.measurement_id = ms.measurement_id 
            WHERE m.target_id = $1 
            ORDER BY m.measurement_created DESC LIMIT 3`,
        [target.target_id]
      );

      return { target: target, measurements: targetDetail.rows };
    });

    const result = await Promise.all(targets);

    res.json({
      programDetail: programDetail.rows[0],
      allTargets: allTargetsFromProgram.rows,
      results: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
