"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_1 = require("../controller/payment");
const router = express_1.default.Router();
// GET All payments
router.get("/", payment_1.GetAllPayments);
// GET Single member paymentd
router.get("/:id", payment_1.GetSingleMemberPayments);
// POST create payment
router.post("/:id", payment_1.CreatePayment);
exports.default = router;
