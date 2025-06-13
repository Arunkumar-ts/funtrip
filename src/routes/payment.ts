import express, { Router } from "express";
import { CreatePayment, GetAllPayments, GetSingleMemberPayments } from "../controller/payment";

const router:Router = express.Router();

// GET All payments
router.get("/", GetAllPayments);

// GET Single member paymentd
router.get("/:id", GetSingleMemberPayments);

// POST create payment
router.post("/:id", CreatePayment);

export default router;