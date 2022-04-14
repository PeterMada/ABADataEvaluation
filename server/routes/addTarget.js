const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');
const validinfo = require('../middleware/validinfo');

router.post('/', authorization, validinfo, async (req, res) => {
  try {
    const program_id = req.headers['program_id'];
    const {
      targetTitle,
      targetDescription,
      targetType,
      targetBaselineFrom,
      targetBaselineTo,
      targetBaselineDone,
      targetBaselineCurrent,
      criterionFrom,
      criterionTo,
    } = req.body;

    if (!req.user) {
      return res.status(401).json('Server Error');
    }

    let isTargetDone = false;
    if (targetBaselineDone) {
      isTargetDone = true;
    } else {
      isTargetDone =
        targetBaselineFrom <= targetBaselineCurrent ? true : false;
    }

    //TODO check if has premission to add program to child
    const skillFromProgram = await pool.query(
      'SELECT skill_id FROM programs WHERE program_id = $1',
      [program_id]
    );

    if (skillFromProgram.rows.length !== 1) {
      res
        .status(500)
        .send(
          'You do not have premmision to add new target to this children.'
        );
      return;
    }

    const childFromSkill = await pool.query(
      'SELECT child_id FROM skills WHERE skill_id = $1',
      [skillFromProgram.rows[0].skill_id]
    );

    if (childFromSkill.rows.length !== 1) {
      res
        .status(500)
        .send(
          'You do not have premmision to add new target to this children.'
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
          'You do not have premmision to add new target to this children.'
        );
      return;
    }

    const target = await pool.query(
      `INSERT INTO targets 
        (target_title, target_description, target_type,
          target_baseline_from, target_baseline_to, target_baseline_current,
          target_baseline_complete, target_criterion_from, target_criterion_to,
          program_id, child_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        targetTitle,
        targetDescription,
        targetType,
        targetBaselineFrom ? targetBaselineFrom : 0,
        targetBaselineTo ? targetBaselineTo : 0,
        targetBaselineCurrent ? targetBaselineCurrent : 0,
        isTargetDone,
        criterionFrom,
        criterionTo,
        program_id,
        childFromSkill.rows[0].child_id,
      ]
    );

    const newTarget = target.rows[0].target_id;

    res.json({ targetId: newTarget });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
