import { Coin } from '@/types/coin';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
type CoinListItemProps = {
  coin: Coin;
  onClick: () => void;
};
const CoinListItem = (props: CoinListItemProps) => {
  const { coin, onClick } = props;
  return (
    <Link href={`/coins/${coin.id}`}>
      <a
        className='flex cursor-pointer select-none flex-row items-center justify-between rounded-md border-none px-3 py-2 hover:bg-gray-100'
        onClick={onClick}
      >
        <div className='flex flex-1 flex-row items-center gap-3'>
          <Image
            src={coin.imageUrl ?? '/static/images/defaultCoin.png'}
            alt={coin.name}
            height={20}
            width={20}
          />
          <div>
            {coin.name} ({coin.shortName})
          </div>
        </div>
        <div className='text-gray-500'>{coin.rank && `#${coin.rank}`}</div>
      </a>
    </Link>
  );
};

export default CoinListItem;
