// LEEMOS LOS ARCHIVOS EN PARALELO CON PROMISE
// ES MAS RAPIDO PERO
import { readFile } from 'node:fs/promises';

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text1, text2]) => {
  console.log('Primer archivo: ', text1);
  console.log('Segundo archivo: ', text2);
});
