const express = require('express'); 
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require("./back-end/routes/auth");
const userRoute = require('./back-end/routes/users');
const moviesRoute = require("./back-end/routes/movies1")
const searchRoute = require('./back-end/routes/searchMovies')
const trailerRoute = require('./back-end/routes/getTrailer')
const errorHandler = require('./shared/middlewares/errorHandler');

dotenv.config();
app.use(express.json());

app.use(cors({
    origin:["https://courageous-crow-flip-flops.cyclic.app"],
    methods:['POST' , 'GET'],
    credentials: true
})); 
     

mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('db connection successfull');
        
        
        app.use('/api/auth', authRoute);
        app.use('/api/users',  userRoute);
        app.use('/api/movies', moviesRoute);
        app.use('/api/search', searchRoute)
        app.use('/api/trailers', trailerRoute);
        
        app.use(errorHandler)
        

        app.get('/', (req, res) => {
            res.send('Hello, World!');
        });

                                                                  
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`${port}`));
    })
    .catch((err) => console.log(err));

    

