import { CommandInteraction, Message } from "discord.js";
import { numberType, OptionParams } from "./interfaces";
import createGameBoard from "./utility/createGameBoard";
import emojis from "./utility/emojis";
import handleInput from "./utility/handleInput";
import Options from "./utility/options";
import ms from 'ms-prettify';

export default class Minesweeper {
    static start(interaction: CommandInteraction, options: OptionParams) {
        return new Promise(async res => {
            const _options = new Options(options);

            let bombs = [],
                number: numberType[] = [],
                visible: string[] = [],
                remaining = [],
                extra: string[] = [],
                numberSet: string[] = [""];

            for (let i = 1; i <= _options.size; i++) {
                for (let j = 1; j <= _options.size; j++) {
                    remaining.push(`${emojis(i, "letter")}${j}`);

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


                if (!number[i].position) return;

                numberSet[x] ? numberSet[x] += `,${number[i].position}` : numberSet[x] = number[i].position;
            }

            numberSet = numberSet.filter(v => v)

            if (number.length < 1) throw new Error("Number of bombs should be less than total blocks i.e. size * size");

            let m = {
                embeds: [{
                    title: "💣 Mine 🧹 Sweeper 🎮 Game",
                    description: createGameBoard(_options.size, bombs, number, visible) + `\n\n${_options.embedMessage.replace(/\{prefix\}/g, _options.prefix).replace(/\{timer\}/g, ms(_options.timer))}`
                }],
            }

            const msg = interaction.replied || interaction.deferred ? await interaction.followUp({ fetchReply: true, embeds: m.embeds }) : await interaction.reply({ fetchReply: true, embeds: m.embeds });

            const data = await handleInput(<Message>msg, interaction, bombs, number, visible, numberSet, remaining, _options)

            res(data)
        })
    }
}