require('dotenv').config();

const router = require('express').Router();
const models = require('../models');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userCount = require('../middlewares/userCount');

// CREATE
router.post('/api/users', userCount, async (req, res) => {
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
router.post('/api/users/login', async(req, res) => {
  let user;

  await models.users.findOne({
    where: { username: req.body.username }
  }).then(data => {
    return data? user = data : res.send('User not Found');
  })
    .catch(err => res.send(err));

  if(!user) {
    return res.status(400).send('Cannot find User');
  }

  const userJson = user.toJSON();

  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(userJson, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1440m' });
      res.json(accessToken);
    }
    else
      res.send('Not allowed');
  } catch (err) {
    console.log(err);
  }

});

// FIND ALL
router.get('/api/users', async (req, res) => {
  await models.users.findAll()
    .then(data => res.json(data))
    .catch(err => res.send(err));
});

module.exports = router;
