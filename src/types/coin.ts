export interface Exchange {
  id: string;
  rank: number;
  name: string;
  trustScore: number;
  url: string;
  imageUrl: string;
  tradeVolume24hBTC: number;
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
