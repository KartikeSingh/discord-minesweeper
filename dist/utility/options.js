"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Options {
    constructor(params = {}) {
        var _a, _b;
        this.bombs = typeof (params.bombs) === "number" ? params.bombs : 8;
        this.prefix = typeof (params.prefix) === "string" ? (_b = (_a = params.prefix) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim() : "!choose";
        this.size = params.size || 5;
        this.timer = params.timer || 60000;
        this.embedMessage = params.embedMessage || "To open a box type \`{prefix}block-id\`\nfor example block id of top left block is \`A1\`";
        this.timerMessage = params.timerMessage || "The bombs are blasted, you too way too much time to sweep the bombs\nYou lost";
        this.bombMessage = params.bombMessage || "You stepped on a bombs 💥\nYou lost";
        this.winMessage = params.winMessage || "You successfully cleaned the place gg\nYou Won";
        if (typeof (this.prefix) !== "string")
            throw new Error("Prefix should be of string type but we got " + typeof (this.prefix));
        if ([this.bombs, this.size, this.timer].some(v => typeof (v) !== "number"))
            throw Error("bombs, size, timer all three of these properties should be of number type");
        if (this.size > 10 || this.size < 0)
            throw Error("Size can't be more than 10 or less than 10");
        if (this.timer < 1000)
            throw Error("Timer can't be less than 1000");
        if (this.bombs < 1)
            throw Error("Bombs can't be less than 1");
    }
}
exports.default = Options;
