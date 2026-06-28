import axios from "axios";
import { CoinMarket, CoinDetail, MarketChart } from "../../types/crypto.types";

const BASE_URL = process.env.COINGECKO_BASE_URL;

export const getCoinListService = async (
  page: number = 1
): Promise<CoinMarket[]> => {
  const response = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 20,
      page,
      sparkline: false,
    },
  });

  return response.data;
};

export const getCoinDetailService = async (
  coinId: string
): Promise<CoinDetail> => {
  const response = await axios.get(`${BASE_URL}/coins/${coinId}`, {
    params: {
      localization: false,
      tickers: false,
      community_data: false,
      developer_data: false,
    },
  });

  return response.data;
};


export const getCoinChartService = async (coinId : string, days : number = 1) : Promise<MarketChart> => {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
        params : {
            vs_currency : 'usd',
            days
        }
    })

    return response.data
}


export const searchCoinService  = async (query : string) : Promise<unknown> => {
    const response = await axios.get(`${BASE_URL}/search` ,{ 
        params : {query}
    })

    return response.data
}