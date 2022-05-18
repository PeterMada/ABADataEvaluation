const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');
const validinfo = require('../middleware/validinfo');

router.post('/', authorization, validinfo, async (req, res) => {
  try {
    const child_id = req.headers['child_id'];
    const { skillTitle } = req.body;

    if (!req.user) {
      return res.status(401).json('Server Error');
    }

    const child = await pool.query(
      'SELECT child_id FROM children WHERE supervisor_id = $1 AND child_id = $2',
      [req.user, child_id]
    );

    // TODO this should go to middleware
    if (child.rows.length !== 1) {
      res
        .status(500)
        .send(
          'You do not have premmision to add new skill to this children.'
        );
      return;
    }

    const skill = await pool.query(
      'INSERT INTO skills (skill_title, child_id) VALUES ($1, $2) RETURNING *',
      [skillTitle, child.rows[0].child_id]
    );

    const newSkill = skill.rows[0].skill_id;

    res.json({ skillId: newSkill });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;
