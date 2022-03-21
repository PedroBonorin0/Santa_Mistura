const router = require('express').Router();
const models = require('../models');

const bcrypt = require('bcryptjs');

// CREATE
router.post('/users', async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password) {
    res.status(400);
    res.send('Missing field(s)');
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await models.users.create({
    username: req.body.username,
    password: hashedPassword,
  })
    .then(data => res.json(data))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// LOGIN
router.post('/users/login', async(req, res) => {
  let user;
  await models.users.findOne({
    where: { username: req.body.username }
  }).then(data => {
    return data? user = data : res.status(402).send('User not Found');
  })
    .catch(err => res.send(err));

  if(!user) {
    return res.status(400).send('Cannot find User');
  }

  try {
    if(await bcrypt.compare(req.body.password, user.password))
      res.send('Success');
    else
      res.send('Not allowed');
  } catch (err) {
    console.log(err);
  }

});

module.exports = router;
