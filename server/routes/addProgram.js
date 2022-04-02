const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');
const validinfo = require('../middleware/validinfo');

router.post('/', authorization, validinfo, async (req, res) => {
  try {
    const skill_id = req.headers['skill_id'];
    const { programTitle } = req.body;

    if (!req.user) {
      return res.status(401).json('Server Error');
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
      'INSERT INTO programs (program_title, skill_id) VALUES ($1, $2) RETURNING *',
      [programTitle, skill_id]
    );

    const newProgram = program.rows[0].program_id;

    res.json({ programId: newProgram });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
