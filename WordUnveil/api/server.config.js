/** @type {import('fastify').FastifyServerOptions} */
const config = {
  requestTimeout: 15_000,
  // Enables trust proxy if the application is running behind a proxy
  trustProxy: process.env.NODE_ENV === 'production',
  logger: {
    // Adjust the log level based on the environment
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
    // Enable prettyPrint in development environment for better readability
    prettyPrint: process.env.NODE_ENV === 'development',
  },
  // Custom error handler
  errorHandler: (error, request, reply) => {
    // Log error details in the console (you can integrate this with any error reporting service)
    console.error(error);
    // Reply with a generic message (you can customize the message based on the error type or status code)
    reply.code(500).send({ error: 'Something went wrong!' });
  }
}

module.exports = config
