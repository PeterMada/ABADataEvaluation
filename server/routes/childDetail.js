const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
  const child_id = req.headers['child_id'];
  let chidlDetails = [];

  try {
    const child = await pool.query(
      'SELECT * FROM children WHERE supervisor_id = $1 AND child_id = $2',
      [req.user, child_id]
    );

    // TODO check if user can view this child

    const allSkills = await pool.query(
      'SELECT * FROM skills WHERE  child_id = $1',
      [child_id]
    );

    let allChildrenSkills;

    const promises = allSkills.rows.map(async (skill) => {
      const programForSkill = await pool.query(
        'SELECT * FROM programs WHERE skill_id = $1',
        [skill.skill_id]
      );

      return { skill: skill, programs: programForSkill.rows };
    });

    const result = await Promise.all(promises);

    res.json({ childDetails: child.rows[0], allSkils: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
