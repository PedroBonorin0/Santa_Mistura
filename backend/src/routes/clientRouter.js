const router = require('express').Router();
const models = require('../models');

const authToken = require('../middlewares/authentication');

// CREATE
router.post('/api/clients', authToken, async (req, res) => {
  const { name, isStudent, classId } = req.body;

  if(!name || isStudent === null || !classId) {
    res.status(400);
    res.send('Missing required field(s)');
    return;
  }

  let clientClass, newClient;

  await models.clients.create({
    name: req.body.name,
    isStudent: req.body.isStudent,
    parentName: req.body.parentName,
    phone: req.body.phone,
    parentPhone: req.body.parentPhone,
    balance: req.body.balance,
  })
    .then(data => {
      newClient = data;

      return isStudent? models.classes.findByPk(classId) : res.send(data);
    }).then(data => {
      clientClass = data;

      newClient.setClass(clientClass);
      return res.send(newClient);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ALL
router.get('/api/clients', authToken, async (req, res) => {
  await models.clients.findAll({ include: models.classes })
    .then(data => res.json(data))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ONE
router.get('/api/clients/:id', authToken, async (req, res) => {
  const id = req.params.id;

  await models.clients.findByPk(id, { include: models.classes })
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
router.put('/api/clients/:id', authToken, async (req, res) => {
  await models.clients.update({
    name: req.body.name,
    isStudent: req.body.isStudent,
    parentName: req.body.parentName,
    phone: req.body.phone,
    parentPhone: req.body.parentPhone,
    balance: req.body.balance,
    classId: req.body.classId,
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
router.delete('/api/clients/:id', authToken, async (req, res) => {
  const id = req.params.id;

  await models.clients.destroy({
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
