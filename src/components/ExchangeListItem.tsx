import { Exchange } from '@/types/coin';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
type ExchangeListItemProps = {
  exchange: Exchange;
  onClick: () => void;
};
const ExchangeListItem = (props: ExchangeListItemProps) => {
  const { exchange, onClick } = props;

  return (
    <Link
      // TODO exchange pages
      // href={`/exchanges/${exchange.id}`}
      href={`/exchanges`}
      key={exchange.id}
    >
      <a
        className='flex cursor-pointer select-none flex-row items-center gap-3 rounded-md border-none px-3 py-2 hover:bg-gray-100'
        onClick={onClick}
      >
        <Image
          src={exchange.imageUrl ?? '/static/images/defaultCoin.png'}
          alt={exchange.name}
          height={20}
          width={20}
        />
        <div>{exchange.name}</div>
      </a>
    </Link>
  );
};

export default ExchangeListItem;
