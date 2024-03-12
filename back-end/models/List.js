const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema(
  {
    title: { type: string, required: true, unique: true },
    year: { type: number },
    rated: { type: string },
    runtime: { type: string },
    genre: { type: string },
    plot: { type: string },
    language: { type: string },
    poster: { type: string },
    imdbRating: { type: string },
    type: { type: Boolean, default: false },      
  },
  { timestamps: true }
);

module.exports = mongoose.model('List', ListSchema);