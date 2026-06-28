import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/response";
import { getCoinListService,getCoinChartService,getCoinDetailService,searchCoinService } from "./service";


export const getCoinList = async (req : Request, res : Response) => {
    try {
    const page = Number(req.query.page) || 1
    const coins = await getCoinListService(page)
    return successResponse(res, 200, "Berhasil Mendapatkan Semua Koin", coins)
    } catch (error) {
        return errorResponse(res, 500, (error as Error).message);
    }    
}


export const getCoinDetail = async (req : Request, res : Response) => {
    try {
        const {id} = req.params
        const coin = await getCoinDetailService(id)
        return successResponse(res, 200, "Berhasil Mendapatkan Koin", coin)
    } catch (error) {
        return errorResponse(res, 500, (error as Error).message);
    }
}


export const getCoinChart = async (req : Request, res : Response)  => {
    try {
        const {id} = req.params
        const days = Number(req.query.days) || 1
        
        const coinChart = await getCoinChartService(id, days)
        return successResponse(res, 200, "Berhasil Mendapatkan Chart Coin", coinChart)
    } catch (error) {
        return errorResponse(res, 500, (error as Error).message);
    }
}

export const searchCoin = async (req : Request, res : Response) => {
    try {
        const query = req.query.query as string
        if(!query){
            return errorResponse(res, 400, "Query Tidak Boleh Kosong")
        }
        const coin = await searchCoinService(query)

        return successResponse(res, 200, "Berhasil", coin)
    } catch (error) {
        return errorResponse(res, 500, (error as Error).message);
    }
}