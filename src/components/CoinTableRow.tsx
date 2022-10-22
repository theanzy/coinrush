import React from 'react';
import Image from 'next/image';
import { formatCurrency, formatPercentage } from '@/utils/format';
import Link from 'next/link';
import useIsMobile from 'src/hooks/useIsMobile';
import { Coin } from '@/types/coin';

type CoinTableRowProps = {
  coin: Coin;
};

const CoinTableRow = ({ coin }: CoinTableRowProps) => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className='items-center'>{coin.rank}</div>
      <div>
        <Link href={`/coins/${coin.id}`}>
          <div className='relative flex h-6 w-6 items-center justify-center hover:cursor-pointer md:h-12 md:w-12'>
            <Image
              className='cursor-pointer'
              src={coin.imageUrl || '/defaultCoin.png'}
              alt={coin.shortName}
              layout='fill'
              objectFit='contain'
            />
          </div>
        </Link>
        <div className='ml-2 flex cursor-pointer flex-col items-start justify-center md:ml-4'>
          <Link href={`/coins/${coin.id}`}>
            <a>{coin.name}</a>
          </Link>
          <div className='text-sm uppercase text-gray-400'>
            {coin.shortName}
          </div>
        </div>
      </div>
      <div>
        {formatCurrency('USD', isMobile ? 'compact' : 'standard')(coin.price)}
      </div>
      <div
        className={`justify-self-end ${
          coin.percentChange24h < 0 ? 'text-red-600' : 'text-green-600'
        }`}
      >
        {formatPercentage(coin.percentChange24h)}
      </div>
      <div className='justify-self-end'>
        {formatCurrency('USD', isMobile ? 'compact' : 'standard')(coin.price)}
      </div>
      <div className='justify-self-end'>
        {formatCurrency('USD', isMobile ? 'compact' : 'standard')(coin.price)}
      </div>
    </>
  );
};

export default CoinTableRow;
