import { Middleware } from '@cfworker/web';
import { Telegraf } from 'telegraf/typings/telegraf';
import { TelegrafContext } from 'telegraf/typings/context';

declare function telegrafMiddleware(bot: Telegraf<TelegrafContext>): Middleware;

export = telegrafMiddleware;
