const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN;

const IMG_URL = 'https://image.tmdb.org/t/p/';

function generateJSONForMovies(movies) {
    return movies.map(movie => {
      const { title, name, poster_path, overview, id, vote_average, media_type } = movie;
      return {
        id,
        title,
        name,
        poster_path,
        overview,
        vote_average,
        media_type: 'movie' ,
        
      };
    });
  }


// Fetch popular movies
router.get('/popular', async (req, res) => {
  try {
  
    const { page } = req.query;
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US', {
      params: {
        language: 'en-US',
        page: page || 1,
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTZmZGYyMTQyMTAzYzM5MTJjOWMzNTBiYjQ3MDY2ZSIsInN1YiI6IjY1N2M2NmJkZWM4YTQzMDBhYTZlMzAxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-mUDRV5ue7nHWxZ_qdGeZ-lIFEqNvePssuE4_varoF0`,
      },
    });
    const movies = response.data.results;
    
    const jsonData = generateJSONForMovies(movies);

    
    res.status(200).json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  

module.exports = router;