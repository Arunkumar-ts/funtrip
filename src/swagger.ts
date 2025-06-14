// swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FunTrip API',
      version: '1.0.0',
      // description: 'My Express API with Swagger in TypeScript',
    }
    // servers: [
    //   {
    //     url: `http://localhost:${process.env.PORT}`,
    //   },
    // ],
  },
  apis: ['./src/routes/*'], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
