import Favorite from "./model";


export const addFavoriteService = async (userId : string ,coinId : string) => {
    // Check APakah Coin Sudah ada atau belum
    const existing = await Favorite.findOne({userId, coinId})
    if(existing) {
        throw new Error("Koin Sudah Ada")
    }

    const favorite = await Favorite.create({userId, coinId})
    return favorite
}

export const getCoinListFavorite = async (userId : string) => {
    const coins = await Favorite.find({userId})
    return coins
}

export const removeFavoriteService = async (userId : string, coinId : string) => {
    const favorite = await Favorite.findOneAndDelete({userId, coinId})
    if(!favorite) {
        throw new Error("Koin Tidak Di Temukan")
    }
    return favorite
}