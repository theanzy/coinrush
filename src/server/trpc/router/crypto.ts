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
  getCoin: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      console.log(input.id);
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${input.id}?community_data=false&localization=false`
      );
      const result = res.data;
      const data = {
        id: result.id,
        shortName: result.symbol,
        name: result.name,
        description: result.description.en,
        homepage: result.links.homepage[0],
        twitter: result.links.twitter_screen_name,
        facebook: result.links.facebook_username,
        reddit: result.links.subreddit_url,
        github: result.links.repos_url.github[0],
        image: result.image.large,
        genesisDate: result.genesis_date,
        rank: result.market_cap_rank,
        price: result.market_data.current_price.usd,
        marketCap: result.market_data.market_cap.usd,
        marketCapChangePercentage24h:
          result.market_data.market_cap_change_percentage_24h,
        totalVolume: result.market_data.total_volume.usd,
        highVolume24h: result.market_data.high_24h.usd,
        lowVolume24h: result.market_data.low_24h.usd,
        change24h: result.market_data.price_change_24h,
        changePercentage24h: result.market_data.price_change_percentage_24h,
        totalSupply: result.market_data.total_supply,
        maxSupply: result.market_data.max_supply,
        circulatingSupply: result.market_data.circulating_supply,
      };
      console.log(data);
      return data;
    }),
});