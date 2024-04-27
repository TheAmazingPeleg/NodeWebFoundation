const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/utils/.env.config' });
const app = express();

//Including the error handling mechanism
const AppError = require(__dirname + '/utils/AppError');
const { globalErrorHandler, catchAsync } = require('./controllers/errorController');

//Handling the general uncaught exceptions (Syntax errors, etc.)
process.on('uncaughtException', err => {
    console.error(err.name, err.message);
    console.error('UNCAUGHT EXCEPTION! Shutting down...');
    //Shutting down after server is properly closed
    server.close(() => {
        process.exit(1);
    });
});






/* Write here your code */
app.route('/').get((req, res) => {
    res.send('Hello World!');
});
/* Good luck! */






//Global Unknown Route Handler - using the appError class
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Handling the global error
app.use(globalErrorHandler);

//Handling the general unhandled promise rejections (The db is down, etc.)
process.on('unhandledRejection', err => {
    console.error(err.name, err.message);
    console.error('UNHANDLED REJECTION! Shutting down...');
    //Shutting down after server is properly closed
    server.close(() => {
        process.exit(1);
    });
});

app.listen(process.env.PORT || 8080, () => {
    console.log('[SERVER] Up and running on port: '+ process.env.PORT || 3000);
});