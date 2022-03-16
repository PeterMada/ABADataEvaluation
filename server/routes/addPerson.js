const pool = require('../db');
const express = require('express');
const validinfo = require('../middleware/validinfo');
const router = express.Router();

/*
router.post('/addPerson', validinfo, async (req, res) => {
  try {
    const {
      beforeNameTitle,
      firstName,
      lastName,
      afterNameTitle,
      email,
      emailConfirm,
    } = req.body;

    if (email === emailConfirm) {
      const person = await pool.query(
        'SELECT * FROM persons WHERE user_email = $1',
        [email]
      );

      if (person.rows.length !== 0) {
        return res.status(401).json('Person already exist!');
      }

      const newPerson = await pool.query(
        'INSERT INTO persons (person_firstName, person_lastName, person_titleBefore, person_titleAfter, person_email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [firstName, lastName, beforeNameTitle, afterNameTitle, email]
      );
    }
  } catch (err) {}
});
*/
