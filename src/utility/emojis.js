"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"], emoji = ['0', '🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯'], letter = ["0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
exports.default = (index, type) => type === "number" ? number[index] : type === "letter" ? letter[index] : emoji[index];
