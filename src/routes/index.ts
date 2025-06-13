import express, { Router } from "express";
import member from "./member"
import payment from "./payment";

const router:Router = express.Router();

// API routes
router.use("/member", member);
router.use("/payment", payment);

export default router;
