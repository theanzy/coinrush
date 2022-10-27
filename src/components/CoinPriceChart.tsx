import { trpc } from '@/utils/trpc';
import React, { useState, useEffect, useRef } from 'react';
import PriceChart from './Chart';
import Spinner from './Spinner';
import { BsFullscreen } from 'react-icons/bs';
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
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const getMarketChart = trpc.crypto.getMarketChart.useMutation();
  const [fullscreen, setFullscreen] = useState(false);
  const [localMarketChart, setLocalMarketChart] =
    useState<typeof getMarketChart.data>();

  useEffect(() => {
    const handler = () => {
      if (document.fullscreenElement) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    };
    const elem = containerRef.current;
    elem?.addEventListener('fullscreenchange', handler);
    return () => elem?.removeEventListener('fullscreenchange', handler);
  }, []);
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
  console.log({ fullscreen });

  return (
    <>
      <div className='flex flex-row items-center justify-between'>
        <div className='pb-3 text-xl font-bold'>{coinName} to USD Chart</div>
        <button
          className='mr-3 rounded-full bg-white p-3 text-base text-gray-500 hover:bg-gray-100 '
          onClick={() => {
            containerRef.current?.requestFullscreen();
          }}
        >
          <BsFullscreen />
        </button>
      </div>
      <div className='p-1'></div>
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
      <div
        className='w-full overflow-hidden bg-white'
        style={{
          height: 500,
          padding: fullscreen ? 20 : 0,
        }}
        ref={containerRef}
      >
        {localMarketChart ? (
          <PriceChart
            fullscreen={fullscreen}
            prices={localMarketChart.prices}
            volumes={localMarketChart.volumes}
            title={shortName}
          />
        ) : null}
      </div>
    </>
  );
};

export default CoinPriceChart;
