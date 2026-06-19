// APP PARA USAR LOS LISTADOS ls
// const fs = require("node:fs");

// fs.readdir(".", (err, files) => {
//   if (err) {
//     console.error("Error al leer el achivo", err)
//     return;
//   }
//   //ITERNAMOS CADA UNO DE LOS ELEMENTOS
//   files.forEach((file) => {
//     console.log(file);
//   });
// });

const fs = require('node:fs/promises');

fs.readdir('.')
  .then((files) => {
    files.forEach((file) => {
      console.log(file);
    });
  })
  .catch((err) => {
    if (err) {
      console.error('Error al leer el achivo', err);
    }
  });
