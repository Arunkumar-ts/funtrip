import express, { Router } from "express";
import member from "./member.route"
import payment from "./payment.route";

const router:Router = express.Router();

// API routes
router.use("/member", member);
router.use("/payment", payment);

export default router;
