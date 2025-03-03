//error handler middleware

/*Environment-Specific Responses: In a production environment, you usually don't want to expose stack traces
to users as it can provide sensitive information about your application. This middleware conditionally hides the stack trace based on the environment. */

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack, //if =production it will not give the err.stack otherwise it will give us the err.stack
        //err.stack is useful for debugging, that's why only should be seen in development
    });
};