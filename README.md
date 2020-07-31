# cfworker-middware-telegraf

[![Version](https://img.shields.io/npm/v/cfworker-middware-telegraf.svg?style=flat-square)](https://www.npmjs.com/package/cfworker-middware-telegraf)

Make [telegraf](https://github.com/telegraf/telegraf) (a telegram bot framework) useable in [Cloudflare Workers](https://workers.cloudflare.com/).

## Installation

```bash
npm i cfworker-middware-telegraf
```

## Usage

### 1. Write your code

```js
// index.js
const { Telegraf } = require('telegraf');
const { Application, Router } = require('@cfworker/web');
const createTelegrafMiddware = require('cfworker-middware-telegraf');

const bot = new Telegraf('BOT_TOKEN');

// Your code here, but do not `bot.launch()`

const router = new Router();
router.post('/SECRET_PATH', createTelegrafMiddware(bot));
new Application().use(router.middleware).listen();
```

### 2. Webpack your code and upload to cfworker

```js
// webpack.config.js
module.exports = {
  target: 'webworker',
  entry: './index.js',
  mode: 'production',
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  performance: {
    hints: false,
  },
};
```

Just copy and paste built code to cfworker online editor and save.

Or you can use [Wrangler](https://developers.cloudflare.com/workers/tooling/wrangler), an official CLI tool, so you don't need to copy and paste code manually anymore. But I don't like it due to its inexplicable bugs on Win10.

### 3. Set telegram bot webhook

These codes only need to be run once locally.

```js
const Telegraf = require('telegraf');
const bot = new Telegraf('BOT_TOKEN');

// set webhook
bot.telegram.setWebhook('https://your.cfworker.domain/SECRET_PATH');

// delete webhook
// bot.telegram.deleteWebhook();

// get webhook info
// bot.telegram.getWebhookInfo().then(console.log);
```
