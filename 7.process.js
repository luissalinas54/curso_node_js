//UTILIZAMOS EL OBJETO process QU PROPORCIONA INFORMACION Y CONTROL SOBRE EL POROCESO ACTUAL DE EJECUCUON
//SI ESJECUTAMOS ALGO PARECIDO A ESTO: node 7.process.js twitch curso node hola --uuuu midu
//OBTENEMOS CADA UNO DE LOS ARGUMENTOS
/*
[
    ruta donde esta node
    tuta del fichero que se esta ejjecutando
  'twitch',
  'curso',
  'node',
  'hola',
  '--uuuu',
  'midu'
]
 */
//console.log(process.argv);

//controlar el procesos y su salida
//un 0 signifiva que todo fue bien , un 1 que hay errores
//process.exit(1);

//PODEMOS CONTROLAR LOS EVENTOS DEL PROCESO
// process.on("exit", () => {
//   //LIMPIAMOS RECURSOS
// });

//CURRENT WORKING DIRECTORY, NOS DICE DESDE QUE CARPETA ESTAMOS EJECUTANDO EL PROCESSO
console.log(process.cwd());
