const express = require('express');
const crypto = require('node:crypto'); // <-- Para crear ids
const movies = require('./movies.json');
const { validateMovie, validateMoviesPartial } = require('./schemas/movies');
// const { json } = require('zod');

const PORT = process.env.PORT ?? 1234;
const app = express();

// Middleware para poder usar el req.body
app.use(express.json());
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json({ message: 'hola mudo' });
});

// To dos los recursos que sean movies se identifica con /movies
app.get('/movies', (req, res) => {
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
app.get('/movies/:id', (req, res) => { // path-to-regex
  // aqui recuperamos el parametro
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: 'Movie not found' });
});

// creamos la movie
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);
  console.log(result);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  // CREAMOS EL OBJETO DE LA NEW MOVIE
  const newMovie = {
    id: crypto.randomUUID(), // universal unique identifier v4
    ...result.data // Aqui obtenemos todos los datos validados
  };

  // ESTO NO ES REST PORQUE ETSAMOS GUARDANDO EL ESTADO DE LA APLICACION EN MEMORIA
  movies.push(newMovie);
  // Indicamos que ya se creo el recurso
  res.status(201).json(newMovie); // Actulizar cache del cliente
});

// ACTUALIZAMOS UN DATO DE LA PELICULS
app.patch('/movies/:id', (req, res) => {
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

app.listen(PORT, () => {
  console.log('Server listening on port http://localhost:1234');
});
