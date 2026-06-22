// http://localhost:3000/ <----- en el navegador
// set PORT=1234 && node 9.http.js <---- para cmd para poder declara el puerto que queremos utilizar
// $env:PORT=1234; node 9.http.js  <---- para powershell para poder declara el puerto que queremos utilizar
const http = require('node:http');
const { findAvailablePort } = require('./10.free-port.js');

// '??'  es Usa el valor de la izquierda, pero si es null o undefined, usa el de la derecha
// process.env permite acceder a las variables de entorno del sistema.
// Las variables de entorno permiten configurar la aplicación desde fuera del código.
// Gracias a esto, no es necesario modificar el código para cambiar configuraciones
// como puertos, claves API, contraseñas o direcciones de bases de datos.
// Esto hace que la aplicación sea más flexible, segura y fácil de desplegar
// en diferentes entornos (desarrollo, pruebas y producción).
const desiredPort = process.env.PORT ?? 3000; // OBTENEMOS EL PUERTO DESDE UNA VARIBLE DE ENTORNO, si no existe se usa el puerto 3000 por defecto.

// CREAMOS EL SERVIDOR
const server = http.createServer((req, res) => {
  console.log('request recibida');
  res.end('Hola mundo');
});
// "Intenta usar el puerto 3000. Si está ocupado, busca otro puerto disponible."
findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
});
