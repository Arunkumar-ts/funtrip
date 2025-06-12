import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from "express";
import { Server } from 'http';
import createHttpError from "http-errors";
import { config } from "dotenv";
import MembersRoute from "./routes/member";
import { getConnection } from "./configs/db";


config();
getConnection();
const app:Application = express();
const PORT:Number = Number(process.env.PORT) || 5000;

app.get("/", (req:Request, res:Response, next:NextFunction)=>{
    res.send("hello from TS app");
})

app.use(express.json());
app.use("/api/member", MembersRoute);

app.use(( req:Request, res:Response, next:NextFunction)=>{
    next(new createHttpError.NotFound());
})

const errorHadler:ErrorRequestHandler = (err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        status:err.status || 500,
        message:err.message,
    })
}

app.use(errorHadler)

const server:Server = app.listen(PORT, ()=>{
    console.log(`Server start at http://localhost:${PORT}`);
})