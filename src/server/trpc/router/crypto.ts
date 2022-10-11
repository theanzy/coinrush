import { AsyncReturnType } from '@/utils/tsbs';
import axios from 'axios';
import { t } from '../trpc';
import { z } from 'zod';
export const cryptoRouter = t.router({
  globalStats: t.procedure.query(async () => {
    const res = await axios.get('https://api.coingecko.com/api/v3/global');
    const result = res.data.data;
    const totalMarketCap: number = Object.keys(result?.total_market_cap).reduce(
      (sum, currentKey) => {
        return sum + result?.total_market_cap[currentKey];
      },
      0
    );
    const totalVolume: number = Object.keys(result?.total_volume).reduce(
      (sum, currentKey) => {
        return sum + result?.total_volume[currentKey];
      },
      0
    );
    return {
      totalCryptocurrencies: result?.active_cryptocurrencies,
      totalMarkets: result?.markets,
      totalMarketCap,
      totalVolume,
      total24hChangePercentage: result?.market_cap_change_percentage_24h_usd,
    };
  }),
  coins: t.procedure
    .input(z.object({ pageNumber: z.number() }))
    .mutation(async ({ input }) => {
      const getCoins = async (pageNumber: number) => {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=30&page=${pageNumber}`
        );
        return response.data;
      };
      const result: AsyncReturnType<typeof getCoins> = await getCoins(
        input.pageNumber
      );

      const data = result.map(
        (coin: {
          market_cap_rank: number;
          id: string;
          name: string;
          symbol: string;
          image: string;
          current_price: number;
          price_change_percentage_24h: number;
          high_24h: number;
          market_cap: number;
        }) => {
          return {
            rank: coin.market_cap_rank,
            id: coin.id,
            name: coin.name,
            shortName: coin.symbol,
            imageUrl: coin.image,
            price: coin.current_price,
            percentChange24h: coin.price_change_percentage_24h,
            volume24h: coin.high_24h,
            marketCap: coin.market_cap,
          };
        }
      );
      return data;
    }),
});
