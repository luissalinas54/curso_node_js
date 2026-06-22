// USAMOS LAS PROMISE EN VEZ DE LOS CALLBACKS PARA LEER ARCHIVOS DE MANERA ASINCRONA
const fs = require('node:fs/promises');

fs.readFile('./archivo.txt', 'utf-8').then((text) => {
  console.log('Primer archivo: ', text);
});

console.log('Proceso intermedio');

fs.readFile('./archivo2.txt', 'utf-8').then((text) => {
  console.log('Segundo archivo: ', text);
});
