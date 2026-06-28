import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import { successResponse, errorResponse } from "../../utils/response";
import { addFavoriteService, getCoinListFavoriteService, removeFavoriteService } from "./service";


export const addFavorite = async (req : AuthRequest, res : Response) => {
    try {
        const userId = req.user?.userId
        const {coinId} = req.body

        if(!coinId) {
            return errorResponse(res, 400, "Coin Id Tidak Boleh Kosong")
        }

        const coin = await addFavoriteService(userId as string, coinId)
        return successResponse(res, 201, "Berhasil Menambahkan ke Favorite", coin)
    } catch (error) {
        return errorResponse(res, 500, (error as Error).message);
    }
}


export const getCoinListFavorite = async (req : AuthRequest, res : Response) => {
    try {
        const userId = req.user?.userId
        const coins = await getCoinListFavoriteService(userId as string)

        return successResponse(res, 200, "Berhasil Mendapatkan Semua Koin", coins)
    } catch (error) {
        return errorResponse(res, 500, (error as Error).message);
    }
}


export const removeFavorite = async (req : AuthRequest, res : Response) => {
    try {
        const userId = req.user?.userId
        const {coinId} = req.params

        await removeFavoriteService(userId as string, coinId)

        return successResponse(res, 200, "Berhasil Menghapus Coin")
    } catch (error) {
        return errorResponse(res, 500, (error as Error).message);
    }
}