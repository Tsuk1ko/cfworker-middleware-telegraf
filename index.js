const telegrafResponseBuilder = require('./src/telegrafResponseBuilder');

module.exports = bot => async ({ req, res }) => {
  await bot.handleUpdate(await req.body.json(), telegrafResponseBuilder(res));
  res.status = 200;
};
