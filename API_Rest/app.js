import express, { json } from 'express';
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';
// Como leer un json en ESModules
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

// import del futuro
// import movies form './movies.json' with {type : 'json'};

// import { type } from 'node:os';
// const { json } = require('zod');
// console.log('Estoy ejecutando:', import.meta.url);

// Puerto para la url
const PORT = process.env.PORT ?? 1234;
const app = express();

// Middleware para poder usar el req.body
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

app.use('/movies', moviesRouter);

app.listen(PORT, () => {
  console.log('Server listening on port http://localhost:1234');
});
