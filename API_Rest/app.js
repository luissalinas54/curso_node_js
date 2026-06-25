const express = require('express');
const movies = require('./movies.json');

const PORT = process.env.PORT ?? 1234;
const app = express();
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

app.listen(PORT, () => {
  console.log('Server listening on port http://localhost:1234');
});
