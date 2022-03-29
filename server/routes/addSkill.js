const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');
const validinfo = require('../middleware/validinfo');

router.post('/', authorization, validinfo, async (req, res) => {
  try {
    const { skillTitle } = req.body;

    if (!req.user) {
      return res.status(401).json('Server Error');
    }

    const newSkill = await pool.query(
      'INSERT INTO skills (skill_title, children_id,supervisor_id) VALUES ($1, $2, $3) RETURNING *',
      [skillTitle, req.child, req.user]
    );

    const newSkill = newSkill.rows[0].skill_id;

    res.json({ skillId: newSkill });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
