import { CRYPTOS } from '@/data/Crypto';
import React from 'react';

type CryptoListProps = {
  showAll?: boolean;
};

const CryptoList = ({ showAll = true }: CryptoListProps) => {
  return (
    <table className='table min-w-full table-auto bg-white text-center  text-gray-600'>
      <thead className='bg-gray-20 border-b border-t'>
        <tr className='[&>th]:px-2 [&>th]:py-1'>
          <th>#</th>
          <th className='text-left'>Name</th>
          <th className='text-right'>Price</th>
          <th className='text-right'>24h Change</th>
          <th className='text-right'>24h Volume</th>
          <th className='text-right'>Market Cap</th>
        </tr>
      </thead>

      <tbody>
        {CRYPTOS.map((crypto) => (
          <tr
            key={crypto.rank}
            className='border-b bg-white text-gray-600 [&>td]:py-1 [&>td]:px-2'
          >
            <td>{crypto.rank}</td>
            <td>
              <div className='flex'>
                <div className='min-w-10 h-10 w-10 bg-gray-400'>img</div>
                <div className='ml-4 flex flex-col items-start justify-center'>
                  <div>{crypto.name}</div>
                  <div className='text-xs text-gray-400'>
                    {crypto.shortName}
                  </div>
                </div>
              </div>
            </td>
            <td className='text-right'>{crypto.price}</td>
            <td className='text-right'>{crypto.change24h}</td>
            <td className='text-right'>{crypto.volume24h}</td>
            <td className='text-right'>{crypto.marketCap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoList;
