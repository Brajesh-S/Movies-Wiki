const express = require('express');
const router = express.Router();
const axios = require('axios');

const TMDB_API_ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN;

function generateJSONForMovies(movies) {
    return movies.map(movie => {
      const { title, name, poster_path, overview, id, vote_average, media_type } = movie;
      return {
        id,
        title,
        name,
        posterPath: poster_path,
        overview,
        vote_average,
        media_type
      };
    });
  }

// Search movies
router.get('/', async (req, res) => {
    console.log('Search route accessed!');
    try {
        const searchQuery = req.query.query;

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`,
              },
              params: {
                query: searchQuery,
              }
        };

        const response = await axios.request(options);

        res.status(200).json(response.data.results); // Send only the movie results
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
