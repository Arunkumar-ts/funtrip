"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Payments
//  *   description: Payment management
 */
/**
 * @swagger
 * /api/payment:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   payment_id:
 *                     type: integer
 *                   amount:
 *                     type: integer
 *                   member_id:
 *                     type: string
 *                   transaction_id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   payment_date:
 *                     type: string
 */
// GET All payments
router.get("/", payment_controller_1.GetAllPayments);
/**
 * @swagger
 * /api/payment/{id}:
 *   get:
 *     summary: Get single member payment list
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A member payment list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   payment_id:
 *                     type: integer
 *                   amount:
 *                     type: integer
 *                   member_id:
 *                     type: string
 *                   transaction_id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   payment_date:
 *                     type: string
 */
// GET Single member payment list
router.get("/:id", payment_controller_1.GetSingleMemberPayments);
/**
 * @swagger
 * /api/payment/{id}:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - transaction_id
 *               - status
 *             properties:
 *               amount:
 *                 type: number
 *               transaction_id:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created
 */
// POST create payment
router.post("/:id", payment_controller_1.CreatePayment);
exports.default = router;
