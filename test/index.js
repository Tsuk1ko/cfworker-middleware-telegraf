const { Telegraf } = require('telegraf');
const { Application, Router } = require('@cfworker/web');
const createTelegrafMiddleware = require('../');

const bot = new Telegraf(BOT_TOKEN);
bot.start(ctx => ctx.reply('Welcome'));
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

const router = new Router();
router.post(`/${SECRET_PATH}`, createTelegrafMiddleware(bot));
new Application().use(router.middleware).listen();
