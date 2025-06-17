"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const member_route_1 = __importDefault(require("./member.route"));
const payment_route_1 = __importDefault(require("./payment.route"));
const router = express_1.default.Router();
// API routes
router.use("/member", member_route_1.default);
router.use("/payment", payment_route_1.default);
exports.default = router;
