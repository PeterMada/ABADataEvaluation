const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');
const validinfo = require('../middleware/validinfo');

router.post('/', authorization, validinfo, async (req, res) => {
  try {
    const skill_id = req.headers['skill_id'];
    const {
      programTitle,
      programDescription,
      programBaselineFrom,
      programBaselineTo,
      programBaselineDone,
      programBaselineCurrent,
      targetBaselineFrom,
      targetBaselineTo,
      targetCriterionFrom,
      targetCriterionTo,
      targetType,
    } = req.body;
    console.log(req.body);
    console.log(targetType);

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

    const childFromSkill = await pool.query(
      'SELECT child_id FROM skills WHERE skill_id = $1',
      [skill_id]
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
      `INSERT INTO programs
       (program_title, program_description, program_baseline_from,
        program_baseline_to, program_baseline_result,
        program_baseline_done, target_baseline_from, target_baseline_to,
        target_criterion_from, target_criterion_to, skill_id,
        program_created_by, program_created, target_type) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [
        programTitle,
        programDescription,
        programBaselineFrom,
        programBaselineTo,
        programBaselineCurrent ? programBaselineCurrent : 0,
        isProgramDone,
        targetBaselineFrom ? targetBaselineFrom : 0,
        targetBaselineTo ? targetBaselineTo : 0,
        targetCriterionFrom ? targetCriterionFrom : 0,
        targetCriterionTo ? targetCriterionTo : 0,
        skill_id,
        req.user,
        new Date(),
        targetType,
      ]
    );

    const newProgram = program.rows[0].program_id;

    res.json({ programId: newProgram });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
