import { numberType } from "../interfaces";
import emojis from "./emojis";

const number = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

export default (size: number, bombs: string[], numbers: numberType[], visible: string[]) => {
    let board = "🟥".repeat(size + 2) + "\n";

    for (let i = 1; i <= size; i++) {
        board += `**${emojis(i, "emoji")} **🟥`;
        for (let j = 1; j <= size; j++) {
            let id = `${emojis(i, "letter")}${j}`;

            board += visible.includes(id) ? bombs.includes(id) ? "💣" : emojis(numbers.filter(v => v.position === id)[0].value, "number") : "🟦"
        }

        board += "🟥\n"
    }

    board = `\u2800\u2800 \u2800\u2800${number.slice(0, size).join("")}\n \u2800 \u2800${board} \u2800 \u2800${"🟥".repeat(size + 2)} `;

    return board;
}