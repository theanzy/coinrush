export type Exchange = {
  rank: number;
  name: string;
  volume24h: number;
  weeklyVisits: number;
  numberOfCoins: number;
  fiatSupported: string[];
};

export const EXCHANGES: Exchange[] = [
  {
    rank: 1,
    name: 'Binance',
    volume24h: 5_613_532_358,
    weeklyVisits: 17_041_041,
    numberOfCoins: 387,
    fiatSupported: ['AED', 'AES'],
  },
  {
    rank: 2,
    name: 'Coinbase Exchange',
    volume24h: 512_532_358,
    weeklyVisits: 17_041_041,
    numberOfCoins: 741,
    fiatSupported: ['AED', 'AES'],
  },
  {
    rank: 3,
    name: 'FTX',
    volume24h: 398_532_358,
    weeklyVisits: 17_041_041,
    numberOfCoins: 753,
    fiatSupported: ['AED', 'AES'],
  },
];
