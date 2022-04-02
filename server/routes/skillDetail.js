const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  const skill_id = req.headers['skill_id'];
  let chidlDetails = [];

  try {
    // TODO check if loged usser can view this skill

    const skillDetail = await pool.query(
      'SELECT * FROM skills WHERE  skill_id = $1',
      [skill_id]
    );

    const allPrgramsForSKill = await pool.query(
      'SELECT * FROM programs WHERE  skill_id = $1',
      [skill_id]
    );

    const promises = allPrgramsForSKill.rows.map(async (program) => {
      const targetForProgram = await pool.query(
        'SELECT * FROM targets WHERE program_id = $1',
        [program.program_id]
      );

      return { program: program, targets: targetForProgram.rows };
    });

    const result = await Promise.all(promises);

    res.json({ skillDetail: skillDetail.rows[0], allPrograms: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
