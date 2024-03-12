const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let statusCode = 500; 
    let message = "Internal Server Error";
     
    if (err && err.statusCode === 401) { // Check if err and err.statusCode exist
        statusCode = 401;
        message = "Unauthorized";
    }

    
    res.status(statusCode).json({
        error: true,
        message: message
    });
};

module.exports = errorHandler;