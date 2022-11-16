import { CommandInteraction, Message, MessageCollector } from "discord.js";
import { numberType } from "../interfaces";
import createGameBoard from "./createGameBoard";
import Options from "./options";
import ms from 'ms-prettify';

export default (msg: Message, interaction: CommandInteraction, bombs: string[], number: numberType[], visible: string[], numberSet: string[], remaining: string[], _options: Options) => {
    return new Promise(res => {
        const user = interaction.user;

        const col = new MessageCollector(msg.channel, {
            filter: (m) => m.author.id === user.id && m.content.toLowerCase().startsWith(_options.prefix),
            time: _options.timer
        });

        let d = true;

        col.on('collect', (m) => {
            const pos = m.content.slice(_options.prefix.length)?.toUpperCase();

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

                if (d) m.delete().catch(e => { d = false });

                col.stop("0");
            } else {
                let x = numberSet.filter(v => v.includes(pos))[0];
                numberSet = numberSet.filter(v => !v.includes(pos));
                visible.push(...x.split(","));
                remaining = remaining.filter(v => !x.includes(v));

                if (remaining.length - bombs.length === 0) return col.stop("1");

                interaction.editReply({
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
            } else if (reason === "0") {
                m = _options.bombMessage.replace(/\{user\}/g, user.username);
            } else {
                m = _options.winMessage.replace(/\{user\}/g, user.username);
            };

            interaction.editReply({
                embeds: [{
                    color: reason === "1" ? "GREEN" : "RED",
                    title: m,
                    description: createGameBoard(Math.sqrt(visible.length + remaining.length), bombs, number, visible)  + `\n\n${_options.embedMessage.replace(/\{prefix\}/g, _options.prefix).replace(/\{timer\}/g, ms(_options.timer))}`
                }]
            });

            res({
                endReason: parseInt(reason) || -1,
                score: visible.filter(v => !bombs.includes(v))?.length > 0 ? visible.filter(v => !bombs.includes(v)).map(x => number.filter(v => v.position === x)[0].value)?.reduce((p, c) => p + c) : 0 || 0,
                win: reason === "1",
                board: createGameBoard(Math.sqrt(visible.length + remaining.length), bombs, number, visible)
            })
        })
    })
}