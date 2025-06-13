import express, { Router } from "express";
import {
    getAllMembers,
    GetSingleMember,
    CreateMember,
    UpdateMember,
    DeleteMember
} from "../controller/members";

const router:Router = express.Router();

// GET all members
router.get("/", getAllMembers);

// GET Single member
router.get("/:id", GetSingleMember);

// POST new member
router.post("/", CreateMember);

// PUT update member
router.put("/:id",UpdateMember)

// DELETE delete member
router.delete("/:id", DeleteMember)

export default router;