"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = __importDefault(require("./emojis"));
const number = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
exports.default = (size, bombs, numbers, visible) => {
    let board = "🟥".repeat(size + 2) + "\n";
    for (let i = 1; i <= size; i++) {
        board += `**${(0, emojis_1.default)(i, "emoji")} **🟥`;
        for (let j = 1; j <= size; j++) {
            let id = `${(0, emojis_1.default)(i, "letter")}${j}`;
            board += visible.includes(id) ? bombs.includes(id) ? "💣" : (0, emojis_1.default)(numbers.filter(v => v.position === id)[0].value, "number") : "🟦";
        }
        board += "🟥\n";
    }
    board = `\u2800\u2800 \u2800\u2800${number.slice(0, size).join("")}\n \u2800 \u2800${board} \u2800 \u2800${"🟥".repeat(size + 2)} `;
    return board;
};
