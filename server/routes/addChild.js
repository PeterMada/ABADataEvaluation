const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');
const validinfo = require('../middleware/validinfo');

router.post('/', authorization, validinfo, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      childCode,
      sex,
      dateOfBirth,
      diagnosis,
      photo,
    } = req.body;

    if (!req.user) {
      return res.status(401).json('Server Error');
    }

    const formatedDateOfBirth = dateOfBirth ? dateOfBirth : null;

    const newChildren = await pool.query(
      'INSERT INTO children (child_first_name, child_last_name, child_childCode, child_sex, child_date_of_birth, child_diagnosis, supervisor_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        firstName,
        lastName,
        childCode,
        sex,
        formatedDateOfBirth,
        diagnosis,
        req.user,
      ]
    );

    const newChildrenId = newChildren.rows[0].child_id;

    res.json({ childId: newChildrenId });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;
