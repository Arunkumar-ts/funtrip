import { NextFunction, Request, Response } from "express";
export declare const getAllPayments: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getSingleMemberPayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
