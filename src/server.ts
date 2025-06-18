import express, {NextFunction, Express } from "express";
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

app.use(( next:NextFunction)=>{
    next(new createHttpError.NotFound());
})
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})