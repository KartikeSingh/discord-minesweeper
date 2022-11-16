import { OptionParams } from '../interfaces';

export default class Options {
    /**
    * The command for mining a block e.g. "!choose"
    */
    prefix: string;

    /**
     * The timer for the game e.g. 60000
     */
    timer: number;

    /**
     * Number of bombs to appear e.g. 8
     */
    bombs: number;

    /**
     * Size of mining square e.g. 5
     * 5 will make a 5 x 5 square
     */
    size: number;


    /**
     * The message we show below the game board
     * use {prefix} to get value of prefix
     * use {timer} to get value of timer in human readable format
     * use {user} to replace with username
     */
    embedMessage: string

    /**
     * When game ends due to timer
     * use {user} to replace with username
     */
    timerMessage: string

    /**
     * Message when user mines a bomb i.e. bomb blasts
     * use {user} to replace with username
     */
    bombMessage: string;

    /**
     * Message when user wins
     * use {user} to replace with username
     */
    winMessage: string
    constructor(params: OptionParams = {}) {
        this.bombs = typeof (params.bombs) === "number" ? params.bombs : 8;
        this.prefix = typeof (params.prefix) === "string" ? params.prefix?.toLowerCase()?.trim() : "!choose";
        this.size = params.size || 5;
        this.timer = params.timer || 60000;
        this.embedMessage = params.embedMessage || "To open a box type \`{prefix}block-id\`\nfor example block id of top left block is \`A1\`"
        this.timerMessage = params.timerMessage || "The bombs are blasted, you too way too much time to sweep the bombs\nYou lost";
        this.bombMessage = params.bombMessage || "You stepped on a bombs 💥\nYou lost";
        this.winMessage = params.winMessage || "You successfully cleaned the place gg\nYou Won";

        if (typeof (this.prefix) !== "string") throw new Error("Prefix should be of string type but we got " + typeof (this.prefix));

        if ([this.bombs, this.size, this.timer].some(v => typeof (v) !== "number")) throw Error("bombs, size, timer all three of these properties should be of number type");

        if (this.size > 10 || this.size < 0) throw Error("Size can't be more than 10 or less than 10");
        if (this.timer < 1000) throw Error("Timer can't be less than 1000");
        if (this.bombs < 1) throw Error("Bombs can't be less than 1");
    }
}