const number = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"],
    emoji = ['0', '🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯'],
    letter = ["0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export default (index: number, type: "number" | "letter" | "emoji") => type === "number" ? number[index] :  type === "letter"  ?letter[index]  : emoji[index];