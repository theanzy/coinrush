import { EXCHANGES } from '@/data/Exchange';
import React from 'react';

type ExchangeListProps = {
  showAll?: boolean;
};

const ExchangeList = ({ showAll = true }: ExchangeListProps) => {
  return (
    <div>
      <table className='table min-w-full table-auto bg-white text-center  text-gray-800'>
        <thead className='bg-gray-20 border-b border-t'>
          <tr className='[&>th]:px-2 [&>th]:py-1'>
            <th>#</th>
            <th className='text-left'>Name</th>
            <th className='text-right'>24h Volume</th>
            <th className='text-right'>Weekly Visits</th>
            <th className='text-right'># Coins</th>
            <th className='text-right'>Fiat Supported</th>
          </tr>
        </thead>
        <tbody>
          {EXCHANGES.map((exchange) => (
            <tr
              key={exchange.rank}
              className='border-b bg-white text-gray-800 [&>td]:py-1 [&>td]:px-2'
            >
              <td>{exchange.rank}</td>
              <td>
                <div className='flex items-center'>
                  <div className='min-w-10 h-10 w-10 bg-gray-400'>img</div>
                  <div className='ml-4 flex items-center'>{exchange.name}</div>
                </div>
              </td>
              <td className='text-right'>{exchange.volume24h}</td>
              <td className='text-right'>{exchange.weeklyVisits}</td>
              <td className='text-right'>{exchange.numberOfCoins}</td>
              <td className='text-right'>
                {exchange.fiatSupported.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeList;
