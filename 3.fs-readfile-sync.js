const fs = require("node:fs");

console.log("Contenido del primer archivo:");
const text = fs.readFileSync("./archivo.txt", "utf-8"); //Esta es la manera de leer un archivo de forma sincrona
console.log("Primer archivo: ", text);

console.log("Proceso intermedio");

console.log("Contenido del segundo archivo:");
const text2 = fs.readFileSync("./archivo2.txt", "utf-8"); //Esta es la manera de leer un archivo de forma sincrona
console.log("Segundo archivo: ", text2);
