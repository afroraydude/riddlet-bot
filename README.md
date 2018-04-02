![logo](https://riddletchat.firebaseapp.com/static/media/logo.786543bd.png)

# riddlet-bot

The official bot library for Riddlet, the anonymous chat application and server.

[![NPM](https://nodei.co/npm/riddlet-bot.png)](https://www.npmjs.com/package/riddlet-bot)

[![docs version](https://img.shields.io/badge/docs%20version-v0.11.0-orange.svg)](http://riddlet-docs.afroraydude.com/botinstall/)

## Installation

Installation is fairly simple. Just run `npm install --save riddlet-bot` in your project directory.

## Your first bot

The official bot library allows for very barebones bot creation.

### Simple Log Bot

To create a bot, you first want to create a new `RiddletBot` class.

```js
var RiddletBot = require('riddlet-bot').RiddletBot

var bot = new RiddletBot("http://chat.example.com")
```

You should know if if this works when you get a token printed to your terminal. (ie: `xxxxxxxxxxxxx.yyyyyyyyyyyy.zzzzzzzzzzzz`)

We now want to stop the bot process and put that token as a second parameter. This allows our bot to have the same token each time it connects to the server.

```js
var bot = new RiddletBot("http://chat.example.com", "xxxxxxxxxxxxx.yyyyyyyyyyyy.zzzzzzzzzzzz")
```

Your bot should now log every message it recieves from the server. 

### Custom Message Handler

Now to create a custom Message Handler.

Here is an example message handler that we will be using.

```js
var xMessageHandler = function (bot, message) {
  if(message.data === "!info") {
    bot.SendMessage("test", "#all")
  }
}
```

Now we want to import it into our bot.

```js
var bot = new RiddletBot("http://chat.example.com", "xxxxxxxxxxxxx.yyyyyyyyyyyy.zzzzzzzzzzzz", xMessageHandler)
```

And that's your first bot!
