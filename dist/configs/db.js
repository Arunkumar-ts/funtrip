"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = exports.getConnection = void 0;
const dotenv_1 = require("dotenv");
const mssql_1 = __importDefault(require("mssql"));
exports.sql = mssql_1.default;
(0, dotenv_1.config)();
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
        trustedConnection: false,
    },
};
let pool;
const getConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!pool) {
            pool = yield mssql_1.default.connect(dbConfig);
            console.log("Connected to SQL Server");
        }
        return pool;
    }
    catch (err) {
        console.error("SQL Server connection error:", err);
        throw err;
    }
});
exports.getConnection = getConnection;
