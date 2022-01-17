# cfworker-middware-telegraf

[![Version](https://img.shields.io/npm/v/cfworker-middware-telegraf.svg?style=flat-square)](https://www.npmjs.com/package/cfworker-middware-telegraf)

Make [telegraf](https://github.com/telegraf/telegraf) (a telegram bot framework) useable in [Cloudflare Workers](https://workers.cloudflare.com/).

You can use [cfworker-telegraf-template](https://github.com/Tsuk1ko/cfworker-telegraf-template) directly.

> v2 only support for telegraf@4. If you want to use telegraf@3, please downgrade to v1.

## Installation

```bash
npm i cfworker-middware-telegraf
```

## Usage

### 0. Install dependencies

Here we use webpack 5.

```bash
npm i @cfworker/web telegraf cfworker-middware-telegraf
npm i -D webpack webpack-cli node-polyfill-webpack-plugin
```

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
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  target: 'webworker',
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  resolve: {
    fallback: {
      fs: false,
    },
  },
  plugins: [new NodePolyfillPlugin()],
  performance: {
    hints: false,
  },
};
```

```bash
npx webpack -c webpack.config.js
```

Just copy and paste built code `dist/worker.js` to cfworker online editor and save.

Or you can use [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler), an official CLI tool, so you don't need to copy and paste code manually anymore. But I don't like it due to its inexplicable bugs on Win10.

### 3. Set telegram bot webhook

These codes only need to be run once locally.

```js
const { Telegraf } = require('telegraf');
const bot = new Telegraf('BOT_TOKEN');

(async () => {
  // set webhook
  await bot.telegram.setWebhook('https://your.cfworker.domain/SECRET_PATH');

  // delete webhook
  // await bot.telegram.deleteWebhook();

  // get webhook info
  await bot.telegram.getWebhookInfo().then(console.log);
})();
```
