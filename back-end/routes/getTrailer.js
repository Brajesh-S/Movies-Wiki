const express = require("express");
const axios = require("axios");
const router = express.Router();
const verifyToken = require("../shared/verifyToken");
const TMDB_API_ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN;

router.get("/movie/:id", verifyToken, async (req, res) => {
  try {
    const movieId = req.params.id;
    const response = await fetchTrailers("movie", movieId);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/tv/:id", verifyToken, async (req, res) => {
  try {
    const tvId = req.params.id;
    const response = await fetchTrailers("tv", tvId);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to fetch trailers using Axios
async function fetchTrailers(media_type, id) {
  const url = `https://api.themoviedb.org/3/${media_type}/${id}/videos?language=en-US`;
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`,
  };

  const options = {
    method: "GET",
    url,
    headers,
  };

  return axios.request(options);
}

module.exports = router;
