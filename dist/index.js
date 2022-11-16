"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createGameBoard_1 = __importDefault(require("./utility/createGameBoard"));
const emojis_1 = __importDefault(require("./utility/emojis"));
const handleInput_1 = __importDefault(require("./utility/handleInput"));
const options_1 = __importDefault(require("./utility/options"));
const ms_prettify_1 = __importDefault(require("ms-prettify"));
class Minesweeper {
    static start(interaction, options) {
        return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
            const _options = new options_1.default(options);
            let bombs = [], number = [], visible = [], remaining = [], extra = [], numberSet = [""];
            for (let i = 1; i <= _options.size; i++) {
                for (let j = 1; j <= _options.size; j++) {
                    remaining.push(`${(0, emojis_1.default)(i, "letter")}${j}`);
                }
            }
            extra = remaining;
            while (bombs.length < _options.bombs && extra.length > 0) {
                let p = Math.floor(Math.random() * extra.length);
                bombs.push(extra[p]);
                extra = extra.filter(v => v != extra[p]);
            }
            let l = extra.length;
            while (number.length <= l && extra.length > 0) {
                let p = Math.floor(Math.random() * extra.length);
                number.push({
                    position: extra[p],
                    value: Math.floor(Math.random() * 5)
                });
                extra = extra.filter(v => v != extra[p]);
            }
            for (let i = 0; i < number.length; i++) {
                let x = Math.random() > 0.4 ? numberSet.length - 1 : numberSet.length;
                if (!number[i].position)
                    return;
                numberSet[x] ? numberSet[x] += `,${number[i].position}` : numberSet[x] = number[i].position;
            }
            numberSet = numberSet.filter(v => v);
            if (number.length < 1)
                throw new Error("Number of bombs should be less than total blocks i.e. size * size");
            let m = {
                embeds: [{
                        title: "💣 Mine 🧹 Sweeper 🎮 Game",
                        description: (0, createGameBoard_1.default)(_options.size, bombs, number, visible) + `\n\n${_options.embedMessage.replace(/\{prefix\}/g, _options.prefix).replace(/\{timer\}/g, (0, ms_prettify_1.default)(_options.timer))}`
                    }],
            };
            const msg = interaction.replied || interaction.deferred ? yield interaction.followUp({ fetchReply: true, embeds: m.embeds }) : yield interaction.reply({ fetchReply: true, embeds: m.embeds });
            const data = yield (0, handleInput_1.default)(msg, interaction, bombs, number, visible, numberSet, remaining, _options);
            res(data);
        }));
    }
}
exports.default = Minesweeper;
