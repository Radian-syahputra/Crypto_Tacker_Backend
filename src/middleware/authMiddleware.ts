import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { errorResponse } from "../utils/response"; 

export interface AuthRequest extends Request {
    user? : {
        userId : string
    }
}

export const authMiddleware = (req : AuthRequest, res : Response, next : NextFunction) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return errorResponse(res, 401, "Tidak Ada Token")
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId : string}

        req.user = {userId : decoded.userId}
        next()
    } catch (error) {
        errorResponse(res, 401, "Token Tidak Valid" )
    }
}