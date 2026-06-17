import { readFile } from "node:fs/promises";

console.log("Leyendo primer archivo...");
const text1 = await readFile("./archivo.txt", "utf-8");
console.log("Primer archivo: ", text1);

console.log("Proceso intermedio");

console.log("Leyendo segundo archivo...");
const text2 = await readFile("./archivo2.txt", "utf-8");
console.log("Segundo archivo: ", text2);
