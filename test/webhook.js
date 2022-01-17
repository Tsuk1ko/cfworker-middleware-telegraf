require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

(async () => {
  // set webhook
  await bot.telegram.setWebhook(`${process.env.BOT_WEBHOOK}/${process.env.SECRET_PATH || ''}`);

  // delete webhook
  // await bot.telegram.deleteWebhook();

  // get webhook info
  await bot.telegram.getWebhookInfo().then(console.log);
})();
