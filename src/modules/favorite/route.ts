import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { addFavorite,getCoinListFavorite,removeFavorite } from "./controller";


const router = Router()

router.post('/', authMiddleware, addFavorite)
router.get('/', authMiddleware, getCoinListFavorite)
router.delete('/:coinId', authMiddleware, removeFavorite)

export default router