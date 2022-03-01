const express = require('express');
const app = express();
const cors = require('cors');

//middleware

app.use(cors());
app.use(express.json());

//register and login
app.use('/auth', require('./routes/jwtAuth'));
app.use('/dashobard', require('./routes/dashboard'));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
