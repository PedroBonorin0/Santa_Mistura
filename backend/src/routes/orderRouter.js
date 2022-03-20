const router = require('express').Router();
const models = require('../models');

// CREATE
router.post('/orders', async (req, res) => {
  const { orderDate, productsIds, clientId, payed } = req.body;

  if(!orderDate || !productsIds || !clientId || payed === null) {
    res.status(400);
    res.send('Missing required field(s)');
    return;
  }

  if(!productsIds.length) {
    res.status(400);
    res.send('At least one product is required');
    return;
  }

  let productsInOrder = [];

  for(const prod of req.body.productsIds) {
    await models.products.findByPk(prod)
      .then(data => productsInOrder.push(data))
      .catch(err => res.send(err));
  }

  let finalPrice = 0;
  for(const product of productsInOrder)
    finalPrice += Number(product.price);

  let order, client;

  await models.orders.create({
    orderDate: orderDate,
    price: finalPrice,
    payed: payed,
  })
    .then(data => {
      order = data;

      return models.clients.findByPk(req.body.clientId);
    })
    .then(data => {
      client = data;
      order.setClient(client);

      order.addProducts(productsInOrder);

      return res.send(order);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ALL
router.get('/orders', async (req, res) => {
  await models.orders.findAll({ include: [models.products, models.clients] })
    .then(data => res.send(data))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ONE
router.get('/orders/:id', async (req, res) => {
  const id = req.params.id;

  await models.orders.findByPk(id, { include: [models.products, models.clients] })
    .then(data => {
      if(data) res.json(data);
      else {
        res.status(400);
        res.json('Order not Found!');
        return;
      }
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// UPDATE
router.put('/orders/:id', async (req, res) => {
  let productsInOrder = [];

  for(const prod of req.body.productsIds) {
    await models.products.findByPk(prod)
      .then(data => productsInOrder.push(data))
      .catch(err => res.send(err));
  }

  let finalPrice = 0;
  for(const product of productsInOrder)
    finalPrice += Number(product.price);

  await models.orders.update({
    clientId: req.body.clientId,
    orderDate: req.body.orderDate,
    price: finalPrice,
    payed: req.body.payed
  }, {
    where: {
      id: req.params.id
    }
  })
    .then(async (data) => {
      if(!data === 1) {
        res.status(400);
        res.send('Order not found!');
        return;
      }
      res.send('Order updated!');
    })
    .catch(err => {
      res.status(400);
      res.send(err);
      return;
    });
});

// DELETE ONE
router.delete('/orders/:id', (req, res) => {
  const id = req.params.id;

  models.orders.destroy({
    where: { id: id }
  })
    .then(data => {
      if(!data === 1) {
        res.status(400);
        res.send('Order not found!');
        return;
      }
      res.send('Order deleted!');
    })
    .catch(err => {
      res.status(400);
      res.send(err);
      return;
    });
});

module.exports = router;