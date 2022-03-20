const router = require('express').Router();
const models = require('../models');

// CREATE
router.post('/classes', async (req, res) => {
  const { name, teacherName } = req.body;

  if(!name || !teacherName) {
    res.status(400);
    res.send('Missing required field(s)');
    return;
  }

  await models.classes.create({
    name: req.body.name,
    teacherName: req.body.teacherName,
  })
    .then(data => res.json(data))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ALL
router.get('/classes', async (req, res) => {
  await models.classes.findAll()
    .then(data => res.json(data))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ONE
router.get('/classes/:id', async (req, res) => {
  const id = req.params.id;

  await models.classes.findByPk(id)
    .then(data => {
      if(data) res.json(data);
      else {
        res.status(400);
        res.json('Class not Found!');
        return;
      }
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// UPDATE
router.put('/classes/:id', async (req, res) => {
  await models.classes.update({
    name: req.body.name,
    teacherName: req.body.teacherName,
  }, {
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if(!data === 1) {
        res.status(400);
        res.send('Class not found!');
        return;
      }
      res.send('Class updated!');
    })
    .catch(err => {
      res.status(400);
      res.send(err);
      return;
    });
});

// DELETE ONE
router.delete('/classes/:id', (req, res) => {
  const id = req.params.id;

  models.classes.destroy({
    where: { id: id }
  })
    .then(data => {
      if(!data === 1) {
        res.status(400);
        res.send('Class not found!');
        return;
      }
      res.send('Class deleted!');
    })
    .catch(err => {
      res.status(400);
      res.send(err);
      return;
    });
});

module.exports = router;
