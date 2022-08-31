import { Middleware } from '@cfworker/web';
import { Telegraf } from 'telegraf';

declare function telegrafMiddleware(bot: Telegraf): Middleware;

export = telegrafMiddleware;
