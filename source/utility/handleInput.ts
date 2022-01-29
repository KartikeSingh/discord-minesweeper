import { Message, MessageCollector, User } from "discord.js";
import { numberType } from "../interfaces";
import createGameBoard from "./createGameBoard";
import Options from "./options";
import ms from 'ms-prettify';

export default (msg: Message, user: User, bombs: string[], number: numberType[], visible: string[], numberSet: string[], remaining: string[], _options: Options) => {
    return new Promise(res => {
        const col = new MessageCollector(msg.channel, {
            filter: (m) => m.author.id === user.id && m.content.toLowerCase().startsWith(_options.prefix),
            time: _options.timer
        });

        let d = true;

        col.on('collect', (m) => {
            const args = m.content.split(/ +/g);
console.log(args)
            const pos = args[1]?.toUpperCase() || args[0]?.toUpperCase();

            if (!visible.includes(pos) && !remaining.includes(pos)) {
                m.reply({
                    embeds: [{
                        color: "RED",
                        title: "Invalid block ID"
                    }]
                }).then(async v => {
                    await new Promise(res => setTimeout(res, 3000));
                    v.delete();
                })

                return;
            }

            if (!remaining.includes(pos)) {
                m.reply({
                    embeds: [{
                        color: "RED",
                        title: "This block is already open"
                    }]
                }).then(async v => {
                    await new Promise(res => setTimeout(res, 3000));
                    v.delete();
                })

                return;
            }

            if (bombs.includes(pos)) {
                remaining = remaining.filter(v => !bombs.includes(v));
                visible.push(...bombs);

                col.stop("bomb_blast");
            } else {
                let x = numberSet.filter(v => v.includes(pos))[0];
                numberSet = numberSet.filter(v => !v.includes(pos));
                visible.push(...x.split(","));
                remaining = remaining.filter(v => !x.includes(v));

                if (remaining.length - bombs.length === 0) return col.stop("mined");

                msg.edit({
                    embeds: [{
                        title: "💣 Mine 🧹 Sweeper 🎮 Game",
                        description: createGameBoard(Math.sqrt(visible.length + remaining.length), bombs, number, visible) + `\n\n${_options.embedMessage.replace(/\{prefix\}/g, _options.prefix).replace(/\{timer\}/g, ms(_options.timer))}`
                    }]
                })
            }

            if (d) m.delete().catch(e => { d = false });
        });

        col.on('end', (s, reason) => {
            let m = "";

            if (reason === "time") {
                m = _options.timerMessage.replace(/\{user\}/g, user.username);
                visible.push(...bombs);
            } else if (reason === "bomb_blast") {
                m = _options.bombMessage.replace(/\{user\}/g, user.username);
            } else {
                m = _options.winMessage.replace(/\{user\}/g, user.username);
            };

            msg.edit({
                embeds: [{
                    color: reason === "good" ? "GREEN" : "RED",
                    title: m,
                    description: createGameBoard(Math.sqrt(visible.length + remaining.length), bombs, number, visible) + `\n\nTo open a box type \`${_options.prefix} block-id\`\nfor example block id of top left block is \`A1\``
                }]
            });

            res({
                endReason: reason,
                score: visible.filter(v => !bombs.includes(v))?.length > 0 ? visible.filter(v => !bombs.includes(v))?.reduce((p, c) => p + c) : 0 || 0,
                win: reason === "mined"
            })
        })
    })
}