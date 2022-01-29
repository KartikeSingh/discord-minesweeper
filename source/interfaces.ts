export interface OptionParams {
    /**
     * The command for mining a block e.g. "!choose"
     */
    prefix?: string,

    /**
     * The timer for the game e.g. 60000
     */
    timer?: number,

    /**
     * Number of bombs to appear e.g. 8
     */
    bombs?: number,

    /**
     * Size of mining square e.g. 5
     * 5 will make a 5 x 5 square
     */
    size?: number,

    /**
     * The message we show below the game board
     * use {prefix} to get value of prefix
     * use {timer} to get value of timer in human readable format
     * use {user} to replace with username
     */
    embedMessage?: string

    /**
     * When game ends due to timer
     * use {user} to replace with username
     */
    timerMessage?: string

    /**
     * Message when user mines a bomb i.e. bomb blasts
     * use {user} to replace with username
     */
    bombMessage?: string;

    /**
     * Message when user wins
     * use {user} to replace with username
     */
    winMessage?:string
}

export interface numberType {
    position: string,
    value: number
}