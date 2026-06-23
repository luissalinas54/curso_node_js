// http://localhost:3000/ <----- en el navegador
// set PORT=1234 && node 9.http.js <---- para cmd para poder declara el puerto que queremos utilizar
// $env:PORT=1234; node 9.http.js  <---- para powershell para poder declara el puerto que queremos utilizar
const http = require('node:http');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 3000; // OBTENEMOS EL PUERTO DESDE UNA VARIBLE DE ENTORNO, si no existe se usa el puerto 3000 por defecto.

const processedRequest = (req, res) => {
  // descriminamos para ver a que url de la primera ruta
  res.setHeader('Content-type', 'text/html ; charset=utf-8');
  if (req.url === '/') {
    res.statusCode = 200; // OK
    // COLOCAMOS LOS HEADERS DONDE PUEDE IR EL TYPO DE TEXTOS: PLANO O HTML
    // SI COLOCAMOS HTML EN EL res.end PODEMOMAS MANADRA H1, DIV, ECT
    // charset=utf-8 PARA COLOCAR ACENTOS Y Ñ
    res.end('<h1>Bienvenido a mi página de inicio</h1>');
  } else if (req.url === '/imagen-spider.png') { // esta linea es para devolver imagenes
    // leemos la imagen
    fs.readFile('./spiderman.png', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('<h1>500 Internal Service Error</h1>');
      } else {
        // PONEMOS LA CABECERA PARA LA IMAGENN
        res.setHeader('Content-type', 'image/png');
        res.end(data);
      }
    });
  } else if (req.url === '/contacto') {
    res.statusCode = 200;
    res.end('<h1>Página de los contactos</h1>');
  } else {
    res.statusCode = 404; // NO ENCONTRADO
    res.end('<h1>404</h1>');
  }

  // console.log('request recibida:', req.url);
  // res.end('Hola mundo');
};
// CREAMOS EL SERVIDOR
const server = http.createServer(processedRequest);

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`);
});

const mensaje = 'hola';
console.log(mensaje);
