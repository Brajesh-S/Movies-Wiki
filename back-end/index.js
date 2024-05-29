const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const moviesRoute = require("./routes/movies");
const searchRoute = require("./routes/searchMovies");
const trailerRoute = require("./routes/getTrailer");
const errorHandler = require("./shared/middlewares/errorHandler");

dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://movies-wiki.onrender.com"
    ],
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL)
  .then(() => {

    app.use("/api/auth", authRoute);
    app.use("/api/movies", moviesRoute);
    app.use("/api/search", searchRoute);
    app.use("/api/trailers", trailerRoute);

      app.use(
      express.static(path.join(__dirname, "../front-end/movies-wiki/build"))
    );
    app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "../front-end/movies-wiki/build/index.html")
      );
    });



    app.use(errorHandler);

    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => err);
