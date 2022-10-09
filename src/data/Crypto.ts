export type Crypto = {
  rank: number;
  id: string;
  name: string;
  shortName: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
};
export const CRYPTO_COLUMNS = [
  '#',
  'Name',
  'Price',
  '24h Change',
  '24h Volume',
  'Market Cap',
];
export const CRYPTOS: Crypto[] = [
  {
    rank: 1,
    id: 'bitcoin',
    name: 'Bitcoin',
    shortName: 'BTC',
    price: 19654.98,
    change24h: 0.32,
    volume24h: 24.35e9,
    marketCap: 374.17e9,
  },
  {
    rank: 2,
    id: 'ethereum',
    name: 'Ethereum',
    shortName: 'ETH',
    price: 1343.13,
    change24h: 0.19,
    volume24h: 7.82,
    marketCap: 162.99e9,
  },
  {
    rank: 3,
    id: 'Tether',
    name: 'Tether',
    shortName: 'USDT',
    price: 1.02,
    change24h: 0.01,
    volume24h: 32.22e9,
    marketCap: 68.34e9,
  },
  {
    rank: 4,
    id: 'USDC',
    name: 'USD Coin',
    shortName: 'USDC',
    price: 1,
    change24h: -0.03,
    volume24h: 3.15e9,
    marketCap: 46.06e9,
  },
  {
    rank: 5,
    id: 'BNB',
    name: 'BNB',
    shortName: 'BNB',
    price: 285.09,
    change24h: 0.2,
    volume24h: 702.27e6,
    marketCap: 45.36e9,
  },
  {
    rank: 6,
    id: 'XRP',
    name: 'XRP',
    shortName: 'XRP',
    price: 0.5268,
    change24h: 6.75,
    volume24h: 2.85e9,
    marketCap: 25.91e9,
  },
  {
    rank: 7,
    id: 'BUSD',
    name: 'Binance USD',
    shortName: 'BUSD',
    price: 1,
    change24h: 0.05,
    volume24h: 4.64e9,
    marketCap: 21.63e9,
  },
];
