import { Exchange, Ticker } from './../../../types/coin';
import { AsyncReturnType } from '@/utils/tsbs';
import axios from 'axios';
import { t } from '../trpc';
import { z } from 'zod';
import { COIN_API_URL } from '@/utils/env';
import { Coin } from '@/types/coin';
import { formatMissingImageUrl } from '@/utils/format';

export const cryptoRouter = t.router({
  globalStats: t.procedure.mutation(async () => {
    const res = await axios.get(`${COIN_API_URL}/global`);
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
    .input(z.object({ pageNumber: z.number(), limit: z.number().nullish() }))
    .mutation(async ({ input }) => {
      const getCoins = async (pageNumber: number, limit: number) => {
        const response = await axios.get(
          `${COIN_API_URL}/coins/markets?vs_currency=usd&per_page=${limit}&page=${pageNumber}`
        );
        return response.data;
      };
      const result: AsyncReturnType<typeof getCoins> = await getCoins(
        input.pageNumber,
        input.limit ?? 10
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
      const res = await axios.get(
        `${COIN_API_URL}/coins/${input.id}?community_data=false&localization=false`
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
      return data;
    }),
  getMarketChart: t.procedure
    .input(
      z.object({ coinId: z.string(), days: z.string(), interval: z.string() })
    )
    .mutation(async ({ input }) => {
      const res = await axios.get(
        `${COIN_API_URL}/coins/${input.coinId}/market_chart?vs_currency=usd&days=${input.days}&interval=${input.interval}`
      );
      const result = res.data;
      const prices = result.prices?.map(([time, value]: number[]) => ({
        time: time ? time / 1000 : 0,
        value: value ?? 0,
      }));
      const volumes = result.total_volumes?.map(([time, value]: number[]) => ({
        time: time ? time / 1000 : 0,
        value: value ?? 0,
      }));
      const marketChart = { prices, volumes };
      return marketChart;
    }),
  getExchanges: t.procedure
    .input(
      z.object({
        totalNumber: z.number().optional().nullish(),
        pageNumber: z.number(),
        perPage: z.number().optional().default(30),
      })
    )
    .mutation(async ({ input }) => {
      let total = input.totalNumber;
      if (total == null || total == undefined) {
        const listResponse = await axios.get(`${COIN_API_URL}/exchanges/list`);
        total = listResponse.data.length;
      }

      const res = await axios.get(
        `${COIN_API_URL}/exchanges?per_page=${input.perPage}&page=${input.pageNumber}`
      );
      const result = res.data;
      const exchanges = result.map(
        (item: {
          id: string;
          trust_score_rank: number;
          name: string;
          trust_score: number;
          url: string;
          image: string;
          trade_volume_24h_btc: number;
        }) => {
          return {
            id: item.id,
            rank: item.trust_score_rank,
            name: item.name,
            trustScore: item.trust_score,
            url: item.url,
            imageUrl: item.image,
            tradeVolume24hBTC: item.trade_volume_24h_btc,
          };
        }
      );
      const response = {
        total,
        data: exchanges,
      };
      return response;
    }),
  getExchange: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const getExchangeRate = async (fiat: string): Promise<number> => {
        const res = await axios.get(`${COIN_API_URL}/exchange_rates`);
        const result = res.data.rates;
        const btcToFiat = result[fiat];
        return btcToFiat.value;
      };
      const response = await axios.get(`${COIN_API_URL}/exchanges/${input.id}`);
      const exchangeData = response.data;

      const btcToUSD = await getExchangeRate('usd');
      const tickers: Ticker[] = exchangeData.tickers.map(
        (
          ticker: {
            base: string;
            target: string;
            converted_last: { usd: number };
            converted_volume: { usd: number };
            trade_url: string;
            coin_id: string;
          },
          i: number
        ) => ({
          num: i + 1,
          base: ticker.base,
          target: ticker.target,
          price: ticker.converted_last.usd,
          volume: ticker.converted_volume.usd,
          tradeUrl: ticker.trade_url,
          baseCoinId: ticker.coin_id,
        })
      );
      return {
        name: exchangeData.name,
        yearEstablished: exchangeData.year_established,
        country: exchangeData.country,
        description: exchangeData.description,
        url: exchangeData.url,
        imageUrl: exchangeData.image,
        facebook: exchangeData.facebook_url,
        reddit: exchangeData.reddit_url,
        telegram_url: exchangeData.telegram_url,
        twitterHandle: exchangeData.twitter_handle,
        centralized: exchangeData.centralized,
        trustScore: exchangeData.trust_score,
        rank: exchangeData.trust_score_rank,
        tradeVolume24hBTC: exchangeData.trade_volume_24h_btc,
        tradeVolume24hUSD:
          exchangeData.trade_volume_24h_btc * (btcToUSD as number),
        tickers,
      };
    }),
  trending: t.procedure.mutation(async () => {
    const res = await axios.get(`${COIN_API_URL}/search/trending`);
    const result = res.data;
    const coins: Coin[] = result.coins?.map(
      (coin: {
        item: {
          name: string;
          id: string;
          symbol: string;
          market_cap_rank: number;
          large: string;
          price_btc: number;
        };
      }) => ({
        name: coin.item.name,
        id: coin.item.id,
        shortName: coin.item.symbol,
        rank: coin.item.market_cap_rank,
        imageUrl: coin.item.large,
        priceBTC: coin.item.price_btc,
      })
    );
    return { coins };
  }),
  search: t.procedure
    .input(
      z.object({
        searchText: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const res = await axios.get(
        `${COIN_API_URL}/search?query=${input.searchText}`
      );
      const result = res.data;
      const coins: Coin[] = result.coins.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        shortName: coin.symbol,
        rank: coin.market_cap_rank,
        imageUrl: formatMissingImageUrl(coin.large),
      }));
      const exchanges: Exchange[] = result.exchanges.map((exchange: any) => ({
        id: exchange.id,
        name: exchange.name,
        imageUrl: formatMissingImageUrl(exchange.large),
      }));
      return {
        coins,
        exchanges,
      };
    }),
});
