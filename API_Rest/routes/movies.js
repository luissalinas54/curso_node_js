import { Router } from 'express';
import { randomUUID } from 'node:crypto'; // <-- Para crear ids

import { validateMovie, validateMoviesPartial } from '../schemas/movies.js';

import { readJSON } from '../utils.js';

const movies = readJSON('./movies.json');
export const moviesRouter = Router();

// CREAMOS EL CONTENEDOR DE URLS CON ACCESO A LOS RECURSOS DEL ORIGEN
// const ACCEPTED_ORIGINS = [
//   'http://localhost:1234',
//   'http://localhost:8080',
//   'http://movies.com'
// ];

moviesRouter.get('/', (req, res) => {
  // creamos filtro para el genero
  const { genre } = req.query;
  if (genre) {
    const filterMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filterMovies);
  }

  res.json(movies);
});

// segmento dinamico/paramentro de url
moviesRouter.get('/:id', (req, res) => { // path-to-regex
  // aqui recuperamos el parametro
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: 'Movie not found' });
});

// creamos la movie
moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body);

  if (!result.error.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  // CREAMOS EL OBJETO DE LA NEW MOVIE
  const newMovie = {
    id: randomUUID(), // universal unique identifier v4
    ...result.data // Aqui obtenemos todos los datos validados
  };

  // ESTO NO ES REST PORQUE ETSAMOS GUARDANDO EL ESTADO DE LA APLICACION EN MEMORIA
  movies.push(newMovie);
  // Indicamos que ya se creo el recurso
  res.status(201).json(newMovie); // Actulizar cache del cliente
});

// METODO PARA ELIMINAR UNA MOVIE
moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(400).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: 'Movie deleted' });
});

// ACTUALIZAMOS UN DATO DE LA PELICULAS
moviesRouter.patch('/:id', (req, res) => {
  const result = validateMoviesPartial(req.body); // obtenemos los parametros del body enviado por el cliente (request)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) { // confirmamos que existe el indice de la pelicula
    return res.status(404).json({ message: 'Movie not found' });
  }
  // ACTUALIZAMOS LA PELICULA
  const updateMovie = {
    // aqui evaluamos el indice movie[1,2,3...]
    ...movies[movieIndex], // obtenermos todas las propiedades del objeto movie original
    ...result.data // reemplaza las propiedades modificdas
  };

  // Guardamso la pelicula en el indice
  movies[movieIndex] = updateMovie;

  // DEVOLVEMOS EL JSON DE LA PELICULA ACTUALIZADA
  return res.json(updateMovie);
});

// optios es la opcion que se necesita para ejecutar los mentodos PUT, POST, PATCH. DELETE
// moviesRouter.options('/:id', (req, res) => {
//   const origin = req.header('origin');
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin);
//     // colocamos todos los metodo que pueden acceder a options
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   }
//   res.send(200);
// });
