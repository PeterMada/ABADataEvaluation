const express = require('express');
const app = express();
const cors = require('cors');

//middleware

app.use(cors());
app.use(express.json());

//register and login
app.use('/auth', require('./routes/jwtAuth'));
app.use('/dashobard', require('./routes/dashboard'));

//List
app.use('/skillList', require('./routes/skillList'));
app.use('/personsList', require('./routes/personsList'));
app.use('/childrenList', require('./routes/childrenList'));

// Detail
app.use('/skillDetail', require('./routes/skillDetail'));
app.use('/programDetail', require('./routes/programDetail'));
app.use('/childDetail', require('./routes/childDetail'));
app.use('/targetDetail', require('./routes/targetDetail'));

// Add
app.use('/addSkill', require('./routes/addSkill'));
app.use('/addProgram', require('./routes/addProgram'));
app.use('/addTarget', require('./routes/addTarget'));
app.use('/addPerson', require('./routes/addPerson'));
app.use('/addChild', require('./routes/addChild'));

// Edit
app.use('/skillList', require('./routes/skillList'));
app.use('/editSkill', require('./routes/editSkill'));

// Other
app.use('/profile', require('./routes/profile'));
app.use('/allChildrenTargets', require('./routes/allChildrenTargets'));
app.use('/allChildrenOpenTargets', require('./routes/allChildrenOpenTargets'));
app.use('/recordMeasurement', require('./routes/recordMeasurement'));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started succesfully`);
});
