const { Telegraf, Markup } = require('telegraf');
const { Application, Router } = require('@cfworker/web');
const createTelegrafMiddleware = require('../');

const bot = new Telegraf(self.BOT_TOKEN);
bot.start(ctx => ctx.reply('Welcome'));
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

bot.command('caption', ctx => {
  return ctx.replyWithPhoto(
    { url: 'https://picsum.photos/200/300/?random' },
    {
      caption: 'Caption',
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([Markup.button.callback('Plain', 'plain'), Markup.button.callback('Italic', 'italic')]),
    }
  );
});

const router = new Router();
router.post(`/${self.SECRET_PATH}`, createTelegrafMiddleware(bot));
new Application().use(router.middleware).listen();
