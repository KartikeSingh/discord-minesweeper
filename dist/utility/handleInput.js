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
const discord_js_1 = require("discord.js");
const createGameBoard_1 = __importDefault(require("./createGameBoard"));
const ms_prettify_1 = __importDefault(require("ms-prettify"));
exports.default = (msg, interaction, bombs, number, visible, numberSet, remaining, _options) => {
    return new Promise(res => {
        const user = interaction.user;
        const col = new discord_js_1.MessageCollector(msg.channel, {
            filter: (m) => m.author.id === user.id && m.content.toLowerCase().startsWith(_options.prefix),
            time: _options.timer
        });
        let d = true;
        col.on('collect', (m) => {
            var _a;
            const pos = (_a = m.content.slice(_options.prefix.length)) === null || _a === void 0 ? void 0 : _a.toUpperCase();
            if (!visible.includes(pos) && !remaining.includes(pos)) {
                m.reply({
                    embeds: [{
                            color: "RED",
                            title: "Invalid block ID"
                        }]
                }).then((v) => __awaiter(void 0, void 0, void 0, function* () {
                    yield new Promise(res => setTimeout(res, 3000));
                    v.delete();
                }));
                return;
            }
            if (!remaining.includes(pos)) {
                m.reply({
                    embeds: [{
                            color: "RED",
                            title: "This block is already open"
                        }]
                }).then((v) => __awaiter(void 0, void 0, void 0, function* () {
                    yield new Promise(res => setTimeout(res, 3000));
                    v.delete();
                }));
                return;
            }
            if (bombs.includes(pos)) {
                remaining = remaining.filter(v => !bombs.includes(v));
                visible.push(...bombs);
                if (d)
                    m.delete().catch(e => { d = false; });
                col.stop("bomb_blast");
            }
            else {
                let x = numberSet.filter(v => v.includes(pos))[0];
                numberSet = numberSet.filter(v => !v.includes(pos));
                visible.push(...x.split(","));
                remaining = remaining.filter(v => !x.includes(v));
                if (remaining.length - bombs.length === 0)
                    return col.stop("mined");
                interaction.editReply({
                    embeds: [{
                            title: "💣 Mine 🧹 Sweeper 🎮 Game",
                            description: (0, createGameBoard_1.default)(Math.sqrt(visible.length + remaining.length), bombs, number, visible) + `\n\n${_options.embedMessage.replace(/\{prefix\}/g, _options.prefix).replace(/\{timer\}/g, (0, ms_prettify_1.default)(_options.timer))}`
                        }]
                });
            }
            if (d)
                m.delete().catch(e => { d = false; });
        });
        col.on('end', (s, reason) => {
            var _a, _b;
            let m = "";
            if (reason === "time") {
                m = _options.timerMessage.replace(/\{user\}/g, user.username);
                visible.push(...bombs);
            }
            else if (reason === "bomb_blast") {
                m = _options.bombMessage.replace(/\{user\}/g, user.username);
            }
            else {
                m = _options.winMessage.replace(/\{user\}/g, user.username);
            }
            ;
            interaction.editReply({
                embeds: [{
                        color: reason === "good" ? "GREEN" : "RED",
                        title: m,
                        description: (0, createGameBoard_1.default)(Math.sqrt(visible.length + remaining.length), bombs, number, visible) + _options.embedMessage.replace(/\{prefix\}/ig, _options.prefix)
                    }]
            });
            res({
                endReason: reason,
                score: ((_a = visible.filter(v => !bombs.includes(v))) === null || _a === void 0 ? void 0 : _a.length) > 0 ? (_b = visible.filter(v => !bombs.includes(v)).map(x => number.filter(v => v.position === x)[0].value)) === null || _b === void 0 ? void 0 : _b.reduce((p, c) => p + c) : 0 || 0,
                win: reason === "mined"
            });
        });
    });
};
