import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
import logger from './logger';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  //   apis: ['./src/routes/index.ts', './src/server.ts', './src/controller/*/*.ts'],
  apis: ['./src/server.ts', './src/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  //Two Endpoints -> Swagger Page and Docs in JSON format
  //Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  //Docs in JSON format
  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'appliation/json');
    res.send(swaggerSpec);
  });
  logger.info(`Docs available at http://localhost:${port}/docs`);
}
export default swaggerDocs;
