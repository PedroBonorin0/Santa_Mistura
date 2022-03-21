const models = require('../models');

module.exports = async (req, res, next) => {
  let userCount;

  await models.users.count()
    .then(data => userCount = data)
    .catch(err => err);

  if(userCount === 1) return res.send('System cannot have more than 1 user!');

  next();
};
