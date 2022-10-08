import React from 'react';
import CryptoStat from './CryptoStat';

const STATS = [
  {
    name: 'Total Cryptocurrencies',
    value: '12,155',
  },
  {
    name: 'Total Markets',
    value: '79.9k',
  },
  {
    name: 'Total Exchanges',
    value: '373',
  },
  {
    name: 'Total 24h Volume',
    value: '111.8B',
  },
];
const GlobalStats = () => {
  return (
    <section>
      <h2 className='px-5 py-2 text-xl font-bold'>Crypto stats</h2>
      <div className='flex flex-wrap items-center justify-center gap-4 p-6'>
        {STATS.map((stat) => (
          <CryptoStat
            key={stat.name}
            title={stat.name}
            value={stat.value}
          />
        ))}
      </div>
    </section>
  );
};

export default GlobalStats;
