import React from 'react';
import { trpc } from '@/utils/trpc';

import {
  FaBitcoin,
  FaStoreAlt,
  FaChartArea,
  FaChartBar,
  FaChartLine,
} from 'react-icons/fa';
import { currencyFormatter, numberFormatter } from '@/utils/format';

const GlobalStats = () => {
  const globalStats = trpc.crypto.globalStats.useQuery();
  return (
    <>
      <h2 className='py-3 text-xl font-bold'>Crypto stats</h2>
      {globalStats.isLoading ? (
        'Loading'
      ) : (
        <div className='grid grid-cols-3 items-center justify-start gap-4'>
          <div className='rounded border px-8 py-4 shadow-sm'>
            <div className='flex flex-row items-center gap-2'>
              <h3 className='text-lg font-bold'>Total Coins</h3>
              <FaBitcoin className='h-6 w-6 text-yellow-600' />
            </div>
            <p className='text-lg text-gray-500'>
              {numberFormatter.format(globalStats.data?.totalCryptocurrencies)}
            </p>
          </div>
          <div className='rounded border px-8 py-4 shadow-sm'>
            <div className='flex flex-row items-center gap-2'>
              <h3 className='text-lg font-bold'>Total Markets</h3>
              <FaStoreAlt className='h-6 w-6 text-green-600' />
            </div>
            <p className='text-lg text-gray-500'>
              {numberFormatter.format(globalStats.data?.totalMarkets)}
            </p>
          </div>
          <div className='rounded border px-8 py-4 shadow-sm'>
            <div className='flex flex-row items-center gap-2'>
              <h3 className='text-lg font-bold'>Total Volume</h3>
              <FaChartBar className='h-6 w-6 text-orange-500' />
            </div>
            <p className='text-lg text-gray-500'>
              {numberFormatter.format(globalStats.data?.totalVolume || 0)}
            </p>
          </div>
          <div className='rounded border px-8 py-4 shadow-sm'>
            <div className='flex flex-row items-center gap-2'>
              <h3 className='text-lg font-bold'>Total Market Cap</h3>
              <FaChartArea className='h-6 w-6 text-red-500' />
            </div>
            <p className='text-lg text-gray-500'>
              {currencyFormatter.format(globalStats.data?.totalMarketCap || 0)}
            </p>
          </div>
          <div className='rounded border px-8 py-4 shadow-sm'>
            <div className='flex flex-row items-center gap-2'>
              <h3 className='text-lg font-bold'>Total 24h Change (USD)</h3>
              <FaChartLine className='h-6 w-6 text-blue-500' />
            </div>
            <p
              className={`text-lg ${
                globalStats.data?.total24hChangePercentage > 0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {numberFormatter.format(
                globalStats.data?.total24hChangePercentage
              )}
              %
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalStats;
