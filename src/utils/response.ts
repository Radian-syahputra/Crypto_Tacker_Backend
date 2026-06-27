import { Response } from "express";

export const successResponse = (res : Response, statusCode : number = 200, message : string, data: unknown = null)  => {
    res.status(statusCode).json({
        success : true,
        message,
        data
    })
}

export const errorResponse = (res : Response, statusCode : number = 400, message : string ) => {
    res.status(statusCode).json({
        success : false,
        message,
        data : null
    })
}