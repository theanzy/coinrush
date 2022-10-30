export interface Exchange {
  id: string;
  rank: number;
  name: string;
  trustScore: number;
  url: string;
  imageUrl: string;
  tradeVolume24hBTC: number;
}

export interface Ticker {
  num: number;
  base: string;
  target: string;
  price: number;
  volume: number;
  tradeUrl: string;
  baseCoinId: string;
}

export type Coin = {
  rank: number;
  id: string;
  name: string;
  imageUrl?: string;
  shortName: string;
  price: number;
  percentChange24h: number;
  volume24h: number;
  marketCap: number;
  priceBTC?: number;
};
