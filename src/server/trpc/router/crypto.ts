import axios from 'axios';
import { t } from '../trpc';

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
});
