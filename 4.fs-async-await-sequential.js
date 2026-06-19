// PROGRAMA ASINCORNO SECUENCIAL CON AWAIT Y PROMISES
// ESTA ES UNA ALTERNATIVA PARA USAR AWAIT CON UN ARCHIVO DE JS
// HACEMOS UNA FUNCION ENVULTA EN UNOS PARENTESIS PRAR INVOCARLA DESPUES
// IIFE INMEDIATELY INVOKED FUNCTION EXPRESSION
// ES EL EQUIVALENTE A HACER UNA FUNCION NORMAL Y LUEGO INVOCARLA COMO EN EL PRIMER EJEMPLO
const { readFile } = require('node:fs/promises');

// async function init() {
//   console.log("Leyendo primer archivo...");
//   const text1 = await readFile("./archivo.txt", "utf-8");
//   console.log("Primer archivo: ", text1);

//   console.log("Proceso intermedio");

//   console.log("Leyendo segundo archivo...");
//   const text2 = await readFile("./archivo2.txt", "utf-8");
//   console.log("Segundo archivo: ", text2);
// }

// init();

(async () => {
  console.log('Leyendo primer archivo...');
  const text1 = await readFile('./archivo.txt', 'utf-8');
  console.log('Primer archivo: ', text1);

  console.log('Proceso intermedio');

  console.log('Leyendo segundo archivo...');
  const text2 = await readFile('./archivo2.txt', 'utf-8');
  console.log('Segundo archivo: ', text2);
})();
