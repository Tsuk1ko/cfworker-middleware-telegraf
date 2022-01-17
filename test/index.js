const { Telegraf } = require('telegraf');
const { Application, Router } = require('@cfworker/web');
const createTelegrafMiddware = require('../');

const bot = new Telegraf(BOT_TOKEN);
bot.start(ctx => ctx.reply('Welcome'));
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

const router = new Router();
router.post(`/${SECRET_PATH}`, createTelegrafMiddware(bot));
new Application().use(router.middleware).listen();
