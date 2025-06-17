"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
const routes_1 = __importDefault(require("./routes"));
const db_1 = require("./configs/db");
const errorHandler_1 = require("./middleware/errorHandler");
const swagger_1 = require("./swagger");
(0, dotenv_1.config)();
(0, db_1.getConnection)();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT);
app.use(express_1.default.json());
(0, swagger_1.setupSwagger)(app);
app.use("/api", routes_1.default);
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server start at http://localhost:${PORT}`);
});
// devops, swagger, service layer
