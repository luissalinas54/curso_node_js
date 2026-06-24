// CREAMOS LA PRIMERA API
const http = require('node:http');

// commonJS -> modulos clasicos de node
const dittoJSON = require('./pokemon/ditto.json');

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-type', 'application/json; charset=utf-8');
          return res.end(JSON.stringify(dittoJSON));
        default:
          res.statusCode = 404;
          res.setHeader('Content-type', 'text/html; charset=utf-8');
          return res.end('<h1>404</h1>');
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = '';
          // Escuchamos el event data
          req.on('data', chunck => {
            // sumamos todos los chucnk(datos de info), porque la informacion (json)puede venir segmentada
            body += chunck;
          });
          // Esperamos a que el evento termine y lance la call
          req.on('end', () => {
            const data = JSON.parse(body);
            // llamar a una base de datos para guardar la info
            res.writeHead(201, { 'Content-type': 'application/json; charset=utf-8' });
            data.timestamp = Date.now;
            res.end(JSON.stringify(data));
          });

          break;
        }
        default:
          res.statusCode = 404;
          res.setHeader('Content-type', 'text/plain; charset=utf-8');
          return res.end('404 NOT FOUND');
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log('Server listening on port http://localhost:1234');
});
