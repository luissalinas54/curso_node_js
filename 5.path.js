const path = require("node:path");
//PARA VER QUE TIPO DE BARRA ES EL SEPARADOR DE LAS RUTAS EN EL SISTEMA OPERATIVO
console.log(path.sep);
//COMO UNIR UN PATH
const pathCompleto = path.join("desktop", "luis", "archivo.txt");
//DEVUELVE ESTO ----> desktop\luis\archivo.txt
console.log(pathCompleto);
//OBTNEER EL NOMBRE DE UN FICHERO DANDO LA RUTA COMPLETA
const nombreArchivo = path.basename("desktop\\luis\\pasword.txt");
console.log(nombreArchivo);
//OBTENER EL NOMBRE DE UN FICHERO DANDO LA RUTA COMPLETA Y QUITANDO LA EXTENSIÓN
const nombreArchivo2 = path.basename("desktop\\luis\\pasword.txt", ".txt");
console.log(nombreArchivo2);
//OBTENER LA EXTENSIÓN DE UN FICHERO DANDO LA RUTA COMPLETA
const ext = path.extname(nombreArchivo);
console.log(ext);
