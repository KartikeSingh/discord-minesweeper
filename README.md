## Installations
```
npm i discord-minesweeper-game
```

## What ?
This package is to make a minesweeper game for your discord bot.

## Why ?
- Easy to use.
- Highly Customizable. ( works with 0 configuration too )
- Fast and advanced.
- Supports discord.js@13.x.x

## How ?
```js
const game = require('discord-minesweeper-game').default;
// import game from 'discord-minesweeper'; // for ts

// interaction = command interaction, we get on slash commands
// for options check below
const result = await game.start(interaction, options);

/* Example result object
 * {
 *  endReason: 0, // -1 => time (took too long to respond), 0 => lost the game, 1 => won the game
 *  score: 10, // Amount of points they won
 *  win: true, // Whether they won or not
 * board: "the game board in string format (the game window made via emojis)"
 * }
 */
```

## Customization with options
- #### Settings
```js
game.start(interaction, {
    size: 3, // Size of game board
    bombs: 3, // Number of bombs
    prefix: "", // The prefix
    timer: 60000, // Time after which game ends
})
```
- #### Custom replies
```js
game.start(ineraction, {
    // Message to add just below the game board
    embedMessage: "ey nerd, use \`{prefix} block-id\` to open a block, block id is like \`A1\`, you just have {timer} time left"

    // Message when bomb is blasted
    bombMessage: "the bombs blasted, you died/lost xd nerddd",

    // Message when timer ends
    timerMessage: "The bomb timer ended, you ded nerd",

    // Message when user wins the game
    winMessage: "You successfully digged the area, gg boi",
})
```

## Images
- #### Gameboard
![image](https://media.discordapp.net/attachments/814009062219317318/1042340314884603905/image.png)

- #### Win Message
![image](https://media.discordapp.net/attachments/814009062219317318/1042340314511323156/image.png)

- #### Bomb Message
![image](https://media.discordapp.net/attachments/814009062219317318/1042340314079318097/image.png)

## Supports
For support or issues or queries contace me on my [discord server](https://discord.gg/YayNfuEkFU).