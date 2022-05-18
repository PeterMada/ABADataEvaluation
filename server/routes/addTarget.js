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
      targetBaselineDone,
      targetBaselineCurrent,
    } = req.body;

    if (!req.user) {
      return res.status(401).json('Server Error');
    }

    //TODO check if has premission to add program to child
    const skillFromProgram = await pool.query(
      'SELECT skill_id, target_baseline_from, program_baseline_from FROM programs WHERE program_id = $1',
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

    let isTargetDone = false;
    if (targetBaselineDone) {
      isTargetDone = true;
    } else {
      isTargetDone =
        skillFromProgram.rows[0].target_baseline_from <=
        targetBaselineCurrent
          ? true
          : false;
    }

    const target = await pool.query(
      `INSERT INTO targets 
        (target_title, target_description, target_baseline_current,
          target_baseline_complete, target_done_from_baseline,
          target_complete, target_baseline_completed_time, target_completed_time,
          program_id, child_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        targetTitle,
        targetDescription,
        targetBaselineCurrent ? targetBaselineCurrent : 0,
        isTargetDone,
        isTargetDone,
        isTargetDone,
        isTargetDone ? new Date().toISOString() : null,
        isTargetDone ? new Date().toISOString() : null,
        program_id,
        childFromSkill.rows[0].child_id,
      ]
    );

    const completedTargets = await pool.query(
      'SELECT target_id FROM targets WHERE program_id = $1 AND target_complete = TRUE',
      [program_id]
    );

    if (
      completedTargets.rows.length >=
      skillFromProgram.rows[0].program_baseline_from
    ) {
      const programUpdateDone = await pool.query(
        `UPDATE programs SET
          program_baseline_done = TRUE
          WHERE program_id = $1 RETURNING program_id`,
        [program_id]
      );
    } else {
      const programUpdateDone = await pool.query(
        `UPDATE programs SET
          program_baseline_done = FALSE
          WHERE program_id = $1 RETURNING program_id`,
        [program_id]
      );
    }

    const newTarget = target.rows[0].target_id;

    res.json({ targetId: newTarget });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;
