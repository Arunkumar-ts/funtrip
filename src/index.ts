import express, {Request, Response, NextFunction, Application} from "express";
import { Server } from 'http';
import createHttpError from "http-errors";
import { config } from "dotenv";
import route from "./routes";
import { getConnection } from "./configs/db";
import { errorHandler } from "./middleware/errorHandler";


config();
getConnection();
const app:Application = express();
const PORT:Number = Number(process.env.PORT);


app.use(express.json());
app.use("/api", route);


app.use(( req:Request, res:Response, next:NextFunction)=>{
    next(new createHttpError.NotFound());
})
app.use(errorHandler)


const server:Server = app.listen(PORT, ()=>{
    console.log(`Server start at http://localhost:${PORT}`);
})