const express = require('express');
const app = express();
const cors = require('cors');

//middleware

app.use(cors());
app.use(express.json());

//register and login
app.use('/auth', require('./routes/jwtAuth'));
app.use('/dashobard', require('./routes/dashboard'));
app.use('/profile', require('./routes/profile'));
app.use('/addPerson', require('./routes/addPerson'));
app.use('/addChild', require('./routes/addChild'));
app.use('/personsList', require('./routes/personsList'));
app.use('/childrenList', require('./routes/childrenList'));
app.use('/addSkill', require('./routes/addSkill'));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started succesfully`);
});
