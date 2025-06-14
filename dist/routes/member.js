"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const members_1 = require("../controller/members");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Members
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
router.get("/", members_1.getAllMembers);
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
router.get("/:id", members_1.GetSingleMember);
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
router.post("/", members_1.CreateMember);
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
router.put("/:id", members_1.UpdateMember);
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
router.delete("/:id", members_1.DeleteMember);
exports.default = router;
