const router = require('express').Router();
const models = require('../models');

const authToken = require('../middlewares/authentication');

// CREATE
router.post('/api/orders', authToken, async (req, res) => {
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

      return payed? res.send(order) : client.update({ balance: (client.balance - finalPrice )});
    }).then(() => res.send(order))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ALL
router.get('/api/orders', authToken, async (req, res) => {
  await models.orders.findAll({ include: [models.products, models.clients] })
    .then(data => res.send(data))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// FIND ONE
router.get('/api/orders/:id', authToken, async (req, res) => {
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
router.put('/api/orders/:id', authToken, async (req, res) => {
  let productsInOrder = [];

  for(const prod of req.body.productsIds) {
    await models.products.findByPk(prod)
      .then(data => {
        productsInOrder.push(data);
      })
      .catch(err => res.send(err));
  }

  let finalPrice = 0;
  for(const product of productsInOrder)
    finalPrice += Number(product.price);

  let payedStatus;

  await models.orders.findByPk(req.params.id)
    .then(data => {
      payedStatus = data.payed;
      return;
    });

  console.log('==================status=================');
  console.log(payedStatus);
  console.log('==================payed=================');
  console.log(req.body.payed);

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
        return res.send('Order not found!');
      }
      return (req.body.payed == payedStatus)? res.send('Order Updated') :
        await models.clients.findByPk(req.body.clientId)
          .then(async (data) => {
            let newBalance = Number(data.balance) + finalPrice;
            await data.update({ balance: newBalance })
              .then(() => res.send('Order and Client\'s balance Updated'));
          });
    })
    .catch(err => {
      res.status(400);
      res.send(err);
      return;
    });
});

// DELETE ONE
router.delete('/api/orders/:id', authToken, async (req, res) => {
  const id = req.params.id;

  await models.orders.destroy({
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
