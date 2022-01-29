## Installations
```
npm i discord-fight-game
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
const game = require('discord-minesweeper').default;
// import game from 'discord-minesweeper'; // for ts

// interaction = command interaction, we get on slash commands
// for options check below
game.start(interaction, options)
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
![image](https://cdn.discordapp.com/attachments/930659938647289856/937021077710852196/unknown.png)

- #### Win Message
![image](https://cdn.discordapp.com/attachments/930659938647289856/937021442703376424/unknown.png)

- #### Timer Message
![image](https://cdn.discordapp.com/attachments/930659938647289856/937021344946741368/unknown.png)

- #### Bomb Message
![image](https://cdn.discordapp.com/attachments/934643467093672017/937021688648986634/unknown.png)

## Supports
For support or issues or queries contace me on my [discord server](https://discord.gg/XYnMTQNTFh).