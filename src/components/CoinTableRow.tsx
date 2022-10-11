import React from 'react';
import { Coin } from '@/data/Coin';
import Image from 'next/image';
import { currencyFormatter } from '@/utils/format';
import Link from 'next/link';

type CoinTableRowProps = {
  coin: Coin;
};

const CoinTableRow = ({ coin }: CoinTableRowProps) => {
  return (
    <>
      <td>{coin.rank}</td>
      <td>
        <div className='flex'>
          <Link href={`/coins/${coin.id}`}>
            <div className='flex items-center justify-center hover:cursor-pointer'>
              <Image
                className='cursor-pointer'
                src={coin.imageUrl || '/defaultCoin.png'}
                alt={coin.shortName}
                width={45}
                height={45}
              />
            </div>
          </Link>
          <div className='ml-4 flex cursor-pointer flex-col items-start justify-center'>
            <Link href={`/coins/${coin.id}`}>
              <a>{coin.name}</a>
            </Link>
            <div className='text-sm uppercase text-gray-400'>
              {coin.shortName}
            </div>
          </div>
        </div>
      </td>
      <td className='text-right'>{currencyFormatter.format(coin.price)}</td>
      <td
        className={`text-right ${
          coin.percentChange24h < 0 ? 'text-red-600' : 'text-green-600'
        }`}
      >
        {coin.percentChange24h}
      </td>
      <td className='text-right'>{currencyFormatter.format(coin.volume24h)}</td>
      <td className='text-right'>{currencyFormatter.format(coin.marketCap)}</td>
    </>
  );
};

export default CoinTableRow;
