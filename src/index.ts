import express, {Request, Response, NextFunction, Express } from "express";
import { Server } from 'http';
import createHttpError from "http-errors";
import { config } from "dotenv";
import route from "./routes";
import { getConnection } from "./configs/db";
import { errorHandler } from "./middleware/errorHandler";
import { setupSwagger } from './swagger'; 

config();
getConnection();
const app:Express = express();
const PORT:number = Number(process.env.PORT);

app.use(express.json());
setupSwagger(app); 
app.use("/api", route);

app.use(( req:Request, res:Response, next:NextFunction)=>{
    next(new createHttpError.NotFound());
})
app.use(errorHandler)

const server:Server = app.listen(PORT, ()=>{
    console.log(`Server start at http://localhost:${PORT}`);
})

// devops, swagger, service layer