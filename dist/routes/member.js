"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const members_1 = require("../controller/members");
const router = express_1.default.Router();
// GET all members
router.get("/", members_1.getAllMembers);
// GET Single member
router.get("/:id", members_1.GetSingleMember);
// POST new member
router.post("/", members_1.CreateMember);
// PUT update member
router.put("/:id", members_1.UpdateMember);
// DELETE delete member
router.delete("/:id", members_1.DeleteMember);
exports.default = router;
