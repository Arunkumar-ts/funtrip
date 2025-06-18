import express, { Router } from "express";
import {
    getMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember
} from "../controllers/members.controller";

const router:Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 */

/**
 * @swagger
 * /api/member/list:
 *   post:
 *     summary: Get all members
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pageSize
 *               - pageIndex
 *             properties:
 *               pageSize:
 *                 type: number
 *               pageIndex:
 *                 type: number
 *               sortBy:
 *                 type: string
 *               sortOn:
 *                  type: string
 *               searchString:
 *                  type: string
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
router.post("/list", getMembers);

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
 *           discription: Member ID
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
router.get("/:id", getMember);

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
 *                 format: email
 *                 example: "arun@example.com"
 *               phone_no:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created
 */
// POST new member
router.post("/", createMember);

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
 *       200:
 *         description: Member updated
 */
// PUT update member
router.put("/:id",updateMember)

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
 *       200:
 *         description: Member deleted
 */
// DELETE delete member
router.delete("/:id", deleteMember)

export default router;