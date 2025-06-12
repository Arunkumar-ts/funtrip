import express, { NextFunction, Request, Response, Router } from "express";
import { getConnection, sql } from "../configs/db";

const router:Router = express.Router();

interface FriendInput {
  member_name: string;
  email: string;
  phone_no?: string;
}

// GET all members
router.get("/", async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const pool = await getConnection();
        const result = await pool.request().execute("GetMembers");
        res.status(200).json(result.recordset);
    } catch (error) {
        next(error);
    }
});

// GET Single member
router.get("/:id", async (req:Request, res:Response, next:NextFunction)=>{
    const id:number = parseInt(req.params.id);
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("member_id", sql.Int, id).execute("GetSingleMember");
        if (result.rowsAffected[0] === 0) {
            throw new Error( "Member not found");
        }
        res.status(200).json(result.recordset);
    } catch (error) {
        next(error)
    }
}) 

// POST new member
router.post("/", async (req:Request, res:Response, next:NextFunction)=>{
    const { member_name, email, phone_no }: FriendInput = req.body;
    if (!member_name || !email ) {
        throw new Error("Name and email are required");
    }
    try {
        const pool = await getConnection();
        await pool.request()
        .input("member_name", sql.VarChar, member_name)
        .input("email", sql.VarChar, email)
        .input("phone_no", sql.VarChar, phone_no).execute("AddMember");
        res.status(201).json({ message: "Member added successfully" });
    } catch (error) {
        next(error);
    }    
})

// PUT update member
router.put("/:id", async (req:Request, res:Response, next:NextFunction)=>{
    const id:number = parseInt(req.params.id);
    const { member_name, email, phone_no }: FriendInput = req.body;
    if (!member_name || !email ) {
        throw new Error("Name and email are required");
    }
    try {
        const pool = await getConnection();

        const result = await pool.request()
            .input("member_id", sql.Int, id)
            .input("member_name", sql.VarChar(100), member_name)
            .input("email", sql.VarChar(100), email)
            .input("phone_no", sql.VarChar(15), phone_no)
            .execute("UpdateMember");

        if (result.rowsAffected[0] === 0) {
            throw new Error("Member not found");
        }
        res.status(201).json({ message: "Member updated successfully" });
    } catch (error) {
        next(error);
    }
})

// DELETE delete member
router.delete("/:id", async (req:Request, res:Response, next:NextFunction)=>{
    const id:number = parseInt(req.params.id);
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("member_id", sql.Int, id)
            .execute("DeleteMember");
        if (result.rowsAffected[0] === 0) {
            throw new Error("Member not found");
        }
        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        next(error);
    }
})

export default router;