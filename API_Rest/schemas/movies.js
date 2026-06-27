// CON ESTE ESQUEMA VALIDAMOS QUE LOS DATOS DENTRO DE MOVIES
// SEAN ENVIADOS CORRECTAMENTE

const z = require('zod');

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be an string.',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2027),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL.'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']),
    {
      required_error: 'Movie genre is requeried',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
});

// Aqui validamos si el object Movie es correcto
function validateMovie (object) {
  return movieSchema.safeParse(object); // <---- te dice si hay un error  hay datos
}

function validateMoviesPartial (objetc) {
  return movieSchema.partial().safeParse(objetc); // partial hace opcional a acada una de las opciones de movie
}

module.exports = {
  validateMovie, validateMoviesPartial
};
