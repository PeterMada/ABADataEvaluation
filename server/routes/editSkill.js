const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');
const validinfo = require('../middleware/validinfo');

router.post('/', authorization, validinfo, async (req, res) => {
  try {
    const skill_id = req.headers['skill_id'];
    const { skillTitle } = req.body;

    if (!req.user) {
      return res.status(401).json('Server Error');
    }

    // TODO Check if user can edit this skill

    const skill = await pool.query(
      'UPDATE skills SET skill_title = $1 WHERE skill_id = $2 RETURNING *',
      [skillTitle, skill_id]
    );

    const newSkill = skill.rows[0].skill_id;

    res.json({ skillId: newSkill });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;
