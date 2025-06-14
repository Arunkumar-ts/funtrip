import express, { Router } from "express";
import {
    getAllMembers,
    GetSingleMember,
    CreateMember,
    UpdateMember,
    DeleteMember
} from "../controller/members";

const router:Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member management
 */

/**
 * @swagger
 * /api/member:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: List of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   member_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
// GET all members
router.get("/", getAllMembers);

/**
 * @swagger
 * /api/member/{id}:
 *   get:
 *     summary: Get a single member by ID
 *     tags: [Members]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A member object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 */
// GET Single member
router.get("/:id", GetSingleMember);

/**
 * @swagger
 * /api/member:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - member_name
 *               - email
 *             properties:
 *               member_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_no:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created
 */
// POST new member
router.post("/", CreateMember);

/**
 * @swagger
 * /api/member/{id}:
 *   put:
 *     summary: Update a member
 *     tags: [Members]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - member_name
 *               - email
 *             properties:
 *               member_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_no:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member updated
 */
// PUT update member
router.put("/:id",UpdateMember)

/**
 * @swagger
 * /api/member/{id}:
 *   delete:
 *     summary: Delete a member
 *     tags: [Members]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *         type: integer
 *     responses:
 *       201:
 *         description: Member deleted
 */
// DELETE delete member
router.delete("/:id", DeleteMember)

export default router;