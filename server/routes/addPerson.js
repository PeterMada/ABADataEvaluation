const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');
const validinfo = require('../middleware/validinfo');

router.post('/', authorization, validinfo, async (req, res) => {
  try {
    const {
      beforeNameTitle,
      firstName,
      lastName,
      afterNameTitle,
      email,
      userRole,
      password,
    } = req.body;

    const currentUserRole = userRole ? userRole : 'supervisor';

    const person = await pool.query(
      'SELECT * FROM users WHERE user_email = $1',
      [email]
    );

    if (person.rows.length !== 0) {
      return res.status(401).json('Osoba již existuje!');
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newPerson = await pool.query(
      'INSERT INTO users (user_first_name, user_last_name, user_title_before, user_title_after, user_email, user_password, user_role, parent_user, user_date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        firstName,
        lastName,
        beforeNameTitle,
        afterNameTitle,
        email,
        bcryptPassword,
        userRole,
        req.user,
        new Date(),
      ]
    );

    const personId = newPerson.rows[0].user_first_name;
    res.json({ personID: personId });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;
