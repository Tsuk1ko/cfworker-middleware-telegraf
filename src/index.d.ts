import { Middleware } from '@cfworker/web';
import { Telegraf } from 'telegraf';

declare function telegrafMiddware(bot: Telegraf): Middleware;

export = telegrafMiddware;
