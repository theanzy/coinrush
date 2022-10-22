import { trpc } from '@/utils/trpc';
import React, { useState, useEffect } from 'react';
import PriceChart from './Chart';
import Spinner from './Spinner';

type CoinPriceChartProps = {
  coinId: string;
  coinName: string;
  shortName: string;
};

const PERIODS: Record<string, Record<string, string>> = {
  '24h': { days: '1', interval: '1h' },
  '7d': { days: '7', interval: '1h' },
  '1m': { days: '30', interval: '12h' },
  '3m': { days: '60', interval: '2d' },
  '1y': { days: '365', interval: '7d' },
  Max: { days: 'max', interval: 'monthly' },
};

const CoinPriceChart = ({
  coinId,
  coinName,
  shortName,
}: CoinPriceChartProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const getMarketChart = trpc.crypto.getMarketChart.useMutation();
  const [localMarketChart, setLocalMarketChart] =
    useState<typeof getMarketChart.data>();
  useEffect(() => {
    getMarketChart
      .mutateAsync({
        coinId,
        days: PERIODS[selectedPeriod]?.days ?? '1d',
        interval: PERIODS[selectedPeriod]?.interval ?? '1h',
      })
      .then((data) => {
        if (data) {
          setLocalMarketChart(data);
        }
      });
  }, [selectedPeriod, PERIODS, coinId]);
  return (
    <>
      <div className='pb-3 text-xl font-bold'>{coinName} to USD Chart</div>
      <div className='flex flex-row items-center justify-center self-end'>
        {Object.keys(PERIODS).map((period) => (
          <button
            type='button'
            key={period}
            className={`user cursor-pointer  border-t border-b border-r py-1 px-3 text-sm outline-none first:rounded-l-full first:border-l last:rounded-r-full  hover:bg-blue-600 hover:text-white ${
              period === selectedPeriod
                ? 'bg-blue-700 text-white'
                : ' text-gray-600'
            }`}
            onClick={() => setSelectedPeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>
      <div className='p-3'></div>
      <div className='flex flex-row items-center justify-center'>
        {getMarketChart.isLoading && <Spinner />}
      </div>
      {localMarketChart && (
        <PriceChart
          prices={localMarketChart.prices}
          volumes={localMarketChart.volumes}
          title={shortName}
        />
      )}
    </>
  );
};

export default CoinPriceChart;
