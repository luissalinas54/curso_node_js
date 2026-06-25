const dittoJSON = require('./pokemon/ditto.json');
const express = require('express');
const app = express();

const PORT = process.env.PORT ?? 1234;

// desactivamos la cabecera para evitar probelmas de seguridad, u otras cabecers innecesarias
app.disable('x-powered-by');

// ESTA ES LA FORMA NATIVA DE EXPRESS DE DECLARAR EL MIDDLEWARE DE ABAJO
// app.use(express.json());

// ------------------------------------------------------------------------------------------------------

// creamos un middleware para extarer informacion para todas las operaciones post
// si ponemos app.get/post... hacemos que ese middleware sea en concreto para ese metodo
app.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  if (req.headers['content-type'] !== 'application/json') return next();
  // Aqui solo llegan request que son POST y que tienen el header content-type: application/json
  let body = '';

  // Escuchamos el event data
  req.on('data', chunk => {
    // <Buffer 7b 0d 0a 20 20 ...  0a 20 20 ... 54 more bytes> <--- esto es el chunk
    // console.log(chunk);
    // sumamos todos los chucnk(datos de info), porque la informacion (json)puede venir segmentada
    body += chunk;
  });
  req.on('end', () => {
    const data = JSON.parse(body);
    // llamar a una base de datos para guardar la info
    data.timestamp = Date.now();
    // mutamos la request y metemos la informacion en el req.body
    req.body = data;
    next();
  });
  // console.log('mi primer middleware');
});
// ----------------------------------------------------------------------------------------------------------------
// DECLARAMOS METODO GET
app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON);
});

app.post('/pokemon', (req, res) => {
  console.log('req.body = ', req.body);
  res.status(201).json(req.body);
});

// CREAMOS UNA FORMA GLOBAL DE TARTAR TODAS LAS REQUEST, ESTA SIEMPRE VA AL UTLIMO
// USAMOS .use para que abarque a todas las opciones get, post, put, etc
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>');
});

// LEVANTAMOS SERVIDOR

app.listen(PORT, () => {
  console.log('Server listening on port http://localhost:1234');
});
