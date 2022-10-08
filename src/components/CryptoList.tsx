import { CRYPTOS, CRYPTO_COLUMNS } from '@/data/Crypto';
import React from 'react';

type CryptoExchangeListProps = {
  showAll?: boolean;
};

const CryptoList = ({ showAll = true }: CryptoExchangeListProps) => {
  return (
    <table className='table min-w-full table-auto text-center text-gray-900'>
      {showAll && (
        <thead className='border-b bg-gray-800 text-gray-50'>
          <tr>
            {CRYPTO_COLUMNS.map((col) => (
              <th
                key={col}
                scope='col'
                className='px-6 py-4 text-sm font-medium text-white'
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {CRYPTOS.map((crypto) => (
          <tr
            key={crypto.id}
            className='border-b bg-white text-gray-600'
          >
            {showAll && <td>{crypto.id}</td>}
            <td className='w-30 p-2'>
              <div className='flex'>
                <div className='h-10 w-10 bg-gray-400'>img</div>
                <div className='ml-4 flex flex-col items-start justify-center'>
                  <div>{crypto.name}</div>
                  <div className='text-xs text-gray-400'>
                    {crypto.shortName}
                  </div>
                </div>
              </div>
            </td>
            <td>{crypto.price}</td>
            <td>{crypto.change24h}</td>
            {showAll && <td>{crypto.volume24h}</td>}
            <td>{crypto.marketCap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoList;
