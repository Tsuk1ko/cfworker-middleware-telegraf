require('abortcontroller-polyfill/dist/polyfill-patch-fetch');
require('./urlPatch');
const telegrafResponseBuilder = require('./telegrafResponseBuilder');

/**
 * @param {import('telegraf').Telegraf} bot
 */
module.exports = bot => {
  return async ({ req, res }) => {
    await bot.handleUpdate(await req.body.json(), telegrafResponseBuilder(res));
    res.status = 200;
  };
};
