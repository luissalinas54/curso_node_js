// PROGRAMA PRA USAR EL FILE SYSTEM FS, ASINCORNO CON CALLBACKS

// ESTO SOLO EN LOS MODULOS NATIVOS
// QUE NON TIENEN PROMISE NATIVAS
// const {promisify} = require("node:util");
// const readFilePromise = promisify();

const fs = require('node:fs');

// el utf-8 es para que lo lea como texto, sino lo lee como un buffer
// const text = fs.readFileSync("./archivo.txt", "utf-8"); //Esta es la manera de leer un archivo de forma sincrona
// MECANISMO DE CALLBACK (err, text)=> PARA SABER CUANDO SE TERMINA DE LEER EL ARCHIVO

console.log('Contenido del archivo:');
console.log('----------------------------------------------');
console.log('Proceso intermedio');

fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(text);
});

console.log('Contenido del segundo archivo:');
console.log('----------------------------------------------');

fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(text);
});
