const pool = require('../db');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validinfo');
const authorization = require('../middleware/authorization');

// register
router.post('/register', validInfo, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await pool.query(
      'SELECT * FROM users WHERE user_email = $1',
      [email]
    );

    if (user.rows.length !== 0) {
      return res.status(401).json('User already exist!');
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_password_created, user_role, user_date_created) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        firstName,
        lastName,
        email,
        bcryptPassword,
        true,
        'supervisor',
        new Date(),
      ]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Chyba serveru');
  }
});

router.post('/login', validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      'SELECT * FROM users WHERE user_email = $1',
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json('Nesprávne heslo nebo email');
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json('Nesprávne heslo nebo email');
    }

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Chyba serveru');
  }
});

router.get('/verify', authorization, (req, res) => {
  try {
    res.status(200).json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Chyba serveru');
  }
});

module.exports = router;
