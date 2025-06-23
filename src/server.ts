import express, { Express } from "express";
import { config } from "dotenv";
import { RegisterRoutes } from './routes/routes';
import * as swaggerDocument from './swagger/swagger.json';
import swaggerUi from 'swagger-ui-express';

config();
const app:Express = express();
const PORT:number = Number(process.env.PORT);

app.use(express.json());

// Register tsoa-generated routes   
RegisterRoutes(app);

// Serve swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`);
    console.log(`Swagger API docs available at http://localhost:${PORT}/api-docs`)
})