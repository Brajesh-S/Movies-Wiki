const mongoose = require('mongoose')

const MoviesSchema = new mongoose.Schema(
  {
    title: { type: string, required: true, unique: true },
    year: { type: number },
    rated: { type: string },
    released: { type: string },
    runtime: { type: string },
    genre: { type: string },
    director: { type: string },
    writer: { type: string },
    actors: { type: string },
    plot: { type: string },
    language: { type: string },
    country: { type: string },
    awards: { type: string },
    poster: { type: string },
    imdbRating: { type: string },
    type: { type: Boolean, default: false },      
  },
  { timestamps: true }
); 

module.exports = mongoose.model('Movies', MoviesSchema);