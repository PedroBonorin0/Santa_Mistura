const router = require('express').Router();
const models = require('../models');

// CREATE
router.post('/clients', async (req, res) => {
  const name = req.body.name;
  const isStudent = req.body.isStudent;

  if(!name || isStudent === null) {
    res.status(400);
    res.send('Missing required field(s)');
    return;
  }

  await models.clients.create({
    name: req.body.name,
    isStudent: req.body.isStudent,
    parentName: req.body.parentName,
    phone: req.body.phone,
    parentPhone: req.body.parentPhone,
    balance: req.body.balance,
    className: req.body.className,
  })
    .then(data => res.json(data))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ALL
router.get('/clients', async (req, res) => {
  await models.clients.findAll()
    .then(data => res.json(data))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ONE
router.get('/clients/:id', async (req, res) => {
  const id = req.params.id;

  await models.clients.findByPk(id)
    .then(data => {
      if(data) res.json(data);
      else {
        res.status(400);
        res.json('Client not Found!');
        return;
      }
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// UPDATE
router.put('/clients/:id', async (req, res) => {
  await models.clients.update({
    name: req.body.name,
    isStudent: req.body.isStudent,
    parentName: req.body.parentName,
    phone: req.body.phone,
    parentPhone: req.body.parentPhone,
    balance: req.body.balance,
    className: req.body.className,
  }, {
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if(!data === 1) {
        res.status(400);
        res.send('Client not found!');
        return;
      }
      res.send('Client updated!');
    })
    .catch(err => {
      res.status(400);
      res.send(err);
      return;
    });
});

// DELETE ONE
router.delete('/clients/:id', (req, res) => {
  const id = req.params.id;

  models.clients.destroy({
    where: { id: id }
  })
    .then(data => {
      if(!data === 1) {
        res.status(400);
        res.send('Client not found!');
        return;
      }
      res.send('Client deleted!');
    })
    .catch(err => {
      res.status(400);
      res.send(err);
      return;
    });
});

module.exports = router;
