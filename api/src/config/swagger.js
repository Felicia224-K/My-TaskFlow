const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Taskflow API',
            version: '1.0.0',
            description: 'API documentation for Taskflow',
        },
        servers: [
            { 
                url: 'http://localhost:4000', description: 'Local server'
            }
        ],
    


    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },

    security: [
        {bearerAuth: [] }
    ],

},

   apis: [ './src/routes/*.js', './src/models/*.js' ], // Path to the API docs

};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger UI available at http://localhost:4000/api-docs');
};


module.exports = setupSwagger ;