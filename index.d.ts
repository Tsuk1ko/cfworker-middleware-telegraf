import { Middleware } from '@cfworker/web';
import { Telegraf } from 'telegraf/typings/telegraf';
import { TelegrafContext } from 'telegraf/typings/context';

declare function telegrafMiddware(bot: Telegraf<TelegrafContext>): Middleware;

export = telegrafMiddware;
