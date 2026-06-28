import { Router } from "express";
import { getCoinList,getCoinChart,getCoinDetail,searchCoin } from "./controller";

const router = Router()

router.get('/coins', getCoinList)
router.get('/coins/:id', getCoinDetail)
router.get('/coins/:id/chart', getCoinChart)
router.get('/search', searchCoin)

export default router