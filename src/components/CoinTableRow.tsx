import React from 'react';
import { Coin } from '@/data/Coin';
import Image from 'next/image';
import { formatCurrency, formatPercentage } from '@/utils/format';
import Link from 'next/link';
import useIsMobile from 'src/hooks/useIsMobile';

type CoinTableRowProps = {
  coin: Coin;
};

const CoinTableRow = ({ coin }: CoinTableRowProps) => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className='hidden md:block'>{coin.rank}</div>
      <div>
        <div className='flex'>
          <Link href={`/coins/${coin.id}`}>
            <div className='relative flex w-5 items-center justify-center hover:cursor-pointer md:w-12'>
              <Image
                className='cursor-pointer'
                src={coin.imageUrl || '/defaultCoin.png'}
                alt={coin.shortName}
                layout='fill'
                objectFit='contain'
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
      </div>
      <div className='text-right'>
        {formatCurrency('USD', isMobile ? 'compact' : 'standard')(coin.price)}
      </div>
      <div
        className={`text-right ${
          coin.percentChange24h < 0 ? 'text-red-600' : 'text-green-600'
        }`}
      >
        {formatPercentage(coin.percentChange24h)}
      </div>
      <div className='text-right'>
        {formatCurrency('USD', isMobile ? 'compact' : 'standard')(coin.price)}
      </div>
      <div className='text-right'>
        {formatCurrency('USD', isMobile ? 'compact' : 'standard')(coin.price)}
      </div>
    </>
  );
};

export default CoinTableRow;
