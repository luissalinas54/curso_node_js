const os = require("node:os");

console.log("Información del sistema operativo:");
console.log("----------------------------------------------");
console.log("Nombre del sistema operativo:", os.platform());
console.log("Versión del sistema operativo:", os.release());
console.log("Arquitectura del sistema:", os.arch());
console.log("Número de CPU:", os.cpus().length);
//console.log("Número de CPU:", os.cpus());
console.log("Memoria total:", os.totalmem() / 1024 / 1024, "GB");
console.log("Memoria disponible:", os.freemem() / 1024 / 1024, "GB");
console.log("Tiempo de actividad del sistema:", os.uptime() / 60 / 60);
