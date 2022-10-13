import React from 'react';
import PriceChart from './Chart';
import { PRICES, VOLUMES } from './prices';

type CoinPriceChartProps = {
  coinId: string;
  coinName: string;
};

const CoinPriceChart = ({ coinId, coinName }: CoinPriceChartProps) => {
  return (
    <>
      <div className='pb-3 text-xl font-bold'>{coinName} to USD Chart</div>
      <PriceChart
        prices={PRICES}
        volumes={VOLUMES}
        title={coinId}
      />
    </>
  );
};

export default CoinPriceChart;
