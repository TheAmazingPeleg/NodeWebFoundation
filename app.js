const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/utils/.env.config' });
const app = express();

//Including Security Middlewares
const limiter = require(__dirname + '/utils/rateLimiter');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

//Including the error handling mechanism
const AppError = require(__dirname + '/utils/AppError');
const { globalErrorHandler, catchAsync } = require('./controllers/errorController');

//Security Middlewares
//Helmet - HTTP Security
app.use(helmet());
//Rate Limiter (Preventing Brute Force Attacks)
app.use(limiter(process.env.MAX_REQUESTS, process.env.LIMIT_PER_MINUTES));
//Limiting the body size of the request
app.use(express.json({ limit: '10kb' }));
//Data sanitization against NoSQL query injection (Operator Injection)
app.use(mongoSanitize());
//Data sanitization against XSS (HTML Tags Injection)
app.use(xss());

//Handling the general uncaught exceptions (Syntax errors, etc.)
process.on('uncaughtException', err => {
    console.error(err.name, err.message);
    console.error('UNCAUGHT EXCEPTION! Shutting down...');
    //Shutting down after server is properly closed
    //server.close(() => {
        process.exit(1);
    //});
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
    //server.close(() => {
        process.exit(1);
    //});
});

app.listen(process.env.PORT || 8080, () => {
    console.log('[SERVER] Up and running on port: '+ process.env.PORT || 3000);
});