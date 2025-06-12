"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
const member_1 = __importDefault(require("./routes/member"));
const db_1 = require("./configs/db");
(0, dotenv_1.config)();
(0, db_1.getConnection)();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
app.get("/", (req, res, next) => {
    res.send("hello from TS app");
});
app.use(express_1.default.json());
app.use("/api/member", member_1.default);
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHadler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
};
app.use(errorHadler);
const server = app.listen(PORT, () => {
    console.log(`Server start at http://localhost:${PORT}`);
});
