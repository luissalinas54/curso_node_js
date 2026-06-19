// PROGRAMA PRA USAR EL FILE SYSTEM FS
const fs = require('node:fs');

const stats = fs.statSync('./archivo.txt');

// console.log(
//   stats.isFile(),
//   stats.isDirectory(),
//   stats.isSymbolicLink(),
//   stats.size,
// );

console.log(`
Archivo: ${stats.isFile() ? 'Sí' : 'No'}
Directorio: ${stats.isDirectory() ? 'Sí' : 'No'}
Enlace simbólico: ${stats.isSymbolicLink() ? 'Sí' : 'No'}
Tamaño: ${stats.size} bytes
`);
