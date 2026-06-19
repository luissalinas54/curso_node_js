//node 8.ls-advance.js
//node 8.ls-advance.js ./cjs <------------------- para entrar en cualquier otra carpeta
const { stat } = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");
//OBTENEMOS LA RUTA
//usa el operador nullish coalescing (??).
//"Toma process.argv[2]; si es null o undefined, usa "." como valor por defecto."
//es nulo porque no estamos pasando ningun argumento en el node node app.js (hola mundo)
//RECORDAR QUE EL PUESTO 0 COORESPONDE A LA RUTA DONDE ESAT NODE, Y EL 1 A LA RUTA DONDE ESTA EJECUTANDOSE EL FICHERO
//PARA OBTENER EL LISTADO DE UNA CAREOTA INTENTA PASAR ALGO COMO:  node 8.ls-advance.js ./cjs
const folder = process.argv[2] ?? ".";
console.log(process.argv[2]);
//ls("./cjs"); <------------esto es folder el directorio raiz del proyecto

//CREAMOS LA FUNCION QUE VA A RECIBIR EL DIRECTORIO
async function ls(folder) {
  //creamos una variable vacia, valor inicial = undefined
  //no se usa const porque asi la variable debe inicializarse de inmediato
  let files;
  try {
    //LEEMOS EL CONTENIDO DEL DIRECTORIO Y LSITAMOS LOS ARCHIVOS como un array gracia a readdir()
    //USAMOS EL AWAIT PORQUE PARA SEGUIR NECESITAMOS QUE PRIMERO SE LEAN TODOS LOS ARCHIVOS DEL DIRECTORIO
    files = await fs.readdir(folder);
  } catch {
    console.error(`No se pudo leer el directorio ${folder}`);
    process.exit(1);
  }

  //CREAMOS LAS PROMESAS DE TODOS LOS ARCHIVOS
  const filePromises = files.map(async (file) => {
    //OBTENERMOS EL FILEPATH DE CADA ARCHIVO:  folder = "./cjs" , file = "app.js" , path completo =  "./cjs/app.js"
    const filePath = path.join(folder, file);
    let stats;
    //OBTENEMOS EL STAT(INFORMACION) DE CADA ARCHIVO

    try {
      stats = await fs.stat(filePath);
    } catch {
      console.error(`No se pudo leer el archivo ${filePath}`);
      process.exit(1);
    }
    //ESTAS SON TODAS LAS PROMESAS A DEVOLVER
    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "d" : "-";
    const fileSize = stats.size;
    const fileModified = stats.mtime.toLocaleString();
    //EL padEnd y padStart ES PARA INDICAR EL NUMERO DE ESPACIOS PADDING
    return `${fileType} ${file.padEnd(20)} ${fileSize.toString().padStart(15)} ${fileModified}`;
  });

  //ESPERAMOS TODAS LAS PROMESAS
  const filesInfo = await Promise.all(filePromises);

  //DEVOLVEMOS EN CONSOLA
  filesInfo.forEach((filesInfo) => console.log(filesInfo));
}

ls(folder);
