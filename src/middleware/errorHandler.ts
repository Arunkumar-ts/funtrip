import {ErrorRequestHandler} from "express";

export const errorHandler:ErrorRequestHandler = (err, _req, res, _next)=>{
    res.status(err.status || 500);
    res.send({
        status:err.status || 500,
        message:err.message || "Internal Server Error",
    })
}