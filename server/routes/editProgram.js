const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');
const validinfo = require('../middleware/validinfo');

router.post('/', authorization, validinfo, async (req, res) => {
  try {
    const program_id = req.headers['program_id'];

    const {
      programTitle,
      programDescription,
      programBaselineFrom,
      programBaselineTo,
      programBaselineDone,
      programBaselineCurrent,
    } = req.body;

    if (!req.user) {
      return res.status(401).json('Server Error');
    }

    let isProgramDone = false;
    if (programBaselineDone) {
      isProgramDone = true;
    } else {
      isProgramDone =
        programBaselineFrom <= programBaselineCurrent ? true : false;
    }

    //TODO check if has premission to add program to child
    const skillFromProgram = await pool.query(
      'SELECT skill_id FROM programs WHERE program_id = $1',
      [program_id]
    );

    const childFromSkill = await pool.query(
      'SELECT child_id FROM skills WHERE skill_id = $1',
      [skillFromProgram.rows[0].skill_id]
    );

    if (childFromSkill.rows.length !== 1) {
      res
        .status(500)
        .send(
          'You do not have premmision to add new program to this children.'
        );
      return;
    }

    const child = await pool.query(
      'SELECT child_id FROM children WHERE supervisor_id = $1 AND child_id = $2',
      [req.user, childFromSkill.rows[0].child_id]
    );

    // TODO this should go to middleware
    if (child.rows.length !== 1) {
      res
        .status(500)
        .send(
          'You do not have premmision to add new program to this children.'
        );
      return;
    }

    const program = await pool.query(
      `UPDATE programs SET
        program_title = $1, program_description = $2,
        program_baseline_from = $3, program_baseline_to = $4,
        program_baseline_result = $5, program_baseline_done = $6
        WHERE program_id = $7 RETURNING program_id`,
      [
        programTitle,
        programDescription,
        programBaselineFrom,
        programBaselineTo,
        programBaselineCurrent ? programBaselineCurrent : 0,
        isProgramDone,
        program_id,
      ]
    );

    const newProgram = program.rows[0].program_id;

    res.json({ programId: newProgram });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;
