import { Request, Response } from "express";
export declare const getMembers: (req: Request, res: Response) => Promise<void>;
export declare const getMember: (req: Request, res: Response) => Promise<void>;
export declare const createMember: (req: Request, res: Response) => Promise<void>;
export declare const updateMember: (req: Request, res: Response) => Promise<void>;
export declare const deleteMember: (req: Request, res: Response) => Promise<void>;
