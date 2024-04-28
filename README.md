# NodeWebFoundation

Practical Website Foundations: A Web Package for Streamlined Development

# Error Handling Package

This package provides comprehensive error handling mechanisms for Node.js applications, covering various scenarios:

1. Global Errors:
   Override error functions to create custom, user-friendly responses, distinguishing between development and production modes.

2. Async Rejections:
   Simplify error handling in async functions by utilizing the "catchAsync" method, which automates try-catch blocks and response handling.

3. MongoDB Errors:
   Easily manage MongoDB errors by naming them "MongoDBError" and specifying the issue in the error message.

4. Unknown Errors:
   Handle unknown errors gracefully by setting a 500 status code and responding with a generic "Something went wrong" message.

5. Exceptions and Rejections:
   Automatically handle exceptions and promise rejections, gracefully terminating the process and sending appropriate messages to clients.

# Security Handling Package

This package provide securities agains several types of attacks:

1. Helmet - Secured HTTP
2. Rate Limiter - Preventing Brute Force Attacks
3. Limiting the body size of the request
4. Data sanitization against NoSQL query injection (Operator Injection)
5. Data sanitization against XSS (HTML Tags Injection)
