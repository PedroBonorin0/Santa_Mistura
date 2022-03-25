const router = require('express').Router();
const models = require('../models');

const authToken = require('../middlewares/authentication');

// CREATE
router.post('/api/products', authToken, async (req, res) => {
  const { name, price } = req.body;

  if(!name || !price) {
    res.status(400);
    res.send('Missing field(s)');
    return;
  }

  await models.products.create({
    name: req.body.name,
    price: req.body.price,
  })
    .then(data => res.json(data))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ALL
router.get('/api/products', authToken, async (req, res) => {
  await models.products.findAll()
    .then(data => res.json(data))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ONE
router.get('/api/products/:id', authToken, async (req, res) => {
  const id = req.params.id;

  await models.products.findByPk(id)
    .then(data => {
      if(data) res.json(data);
      else {
        res.status(400);
        res.json('Product not Found!');
        return;
      }
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// UPDATE
router.put('/api/products/:id', authToken, async (req, res) => {
  await models.products.update({
    name: req.body.name,
    price: req.body.price,
  }, {
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if(!data === 1) {
        res.status(400);
        res.send('Product not found!');
        return;
      }
      res.send('Product updated!');
    })
    .catch(err => {
      res.status(400);
      res.send(err);
      return;
    });
});

// DELETE ONE
router.delete('/api/products/:id', authToken, async (req, res) => {
  const id = req.params.id;

  await models.products.destroy({
    where: { id: id }
  })
    .then(data => {
      if(!data === 1) {
        res.status(400);
        res.send('Product not found!');
        return;
      }
      res.send('Product deleted!');
    })
    .catch(err => {
      res.status(400);
      res.send(err);
      return;
    });
});

module.exports = router;
