"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.createMember = exports.getMember = exports.getMembers = void 0;
const common_response_1 = __importDefault(require("../data-contracts/response/common.response"));
const member_services_1 = require("../services/member.services");
const getMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, member_services_1.getMembersService)(req);
        if (result.success) {
            res.status(200).json(common_response_1.default.success(200, result.data, "Members fetched successfully"));
        }
        else {
            res.status(400).json(common_response_1.default.error(400, "Failed to fetch members.", result.error));
        }
    }
    catch (error) {
        res.status(500).json(common_response_1.default.error(500, "Internal error", error));
    }
});
exports.getMembers = getMembers;
const getMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, member_services_1.getMemberService)(req);
        if (result.success) {
            res.status(200).json(common_response_1.default.success(200, result.data, "Member fetched successfully"));
        }
        else {
            res.status(400).json(common_response_1.default.error(400, "Failed to fetch member.", result.error));
        }
    }
    catch (error) {
        res.status(500).json(common_response_1.default.error(500, "Internal error", error));
    }
});
exports.getMember = getMember;
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, member_services_1.createMemberService)(req);
        if (result.success) {
            res.status(201).json(common_response_1.default.success(201, result.data, "Member added successfully"));
        }
        else {
            res.status(400).json(common_response_1.default.error(400, "Failed to create member.", result.error));
        }
    }
    catch (error) {
        res.status(500).json(common_response_1.default.error(500, "Internal error", error));
    }
});
exports.createMember = createMember;
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, member_services_1.updateMemberService)(req);
        if (result.success) {
            res.status(201).json(common_response_1.default.success(201, result.data, "Member updated successfully"));
        }
        else {
            res.status(400).json(common_response_1.default.error(400, "Failed to update member.", result.error));
        }
    }
    catch (error) {
        res.status(500).json(common_response_1.default.error(500, "Internal error", error));
    }
});
exports.updateMember = updateMember;
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, member_services_1.deleteMemberService)(req);
        if (result.success) {
            res.status(201).json(common_response_1.default.success(201, result.data, "Member deleted successfully"));
        }
        else {
            res.status(400).json(common_response_1.default.error(400, "Failed to delete member.", result.error));
        }
    }
    catch (error) {
        res.status(500).json(common_response_1.default.error(500, "Internal error", error));
    }
});
exports.deleteMember = deleteMember;
