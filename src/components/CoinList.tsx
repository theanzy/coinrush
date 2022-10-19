import { trpc } from '@/utils/trpc';
import React, { useState, useEffect } from 'react';
import CoinTableRow from './CoinTableRow';
import InfinityScroller from '@/components/InfinityScroller';
import Spinner from './Spinner';

type CoinListProps = {
  showAll?: boolean;
};
const RowHeight = 60;
const CoinList = ({ showAll = true }: CoinListProps) => {
  const getCoins = trpc.crypto.coins.useMutation();
  type Coins = typeof getCoins.data;
  const [coins, setCoins] = useState<Coins>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemCount = hasMore ? coins.length + 1 : coins.length;
  const isItemLoaded = (index: number) => !hasMore || index < coins.length;
  const loadMoreItems = async (startIndex: number, stopIndex: number) => {
    if (!getCoins.isLoading && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const RowTemplate = (props: {
    index: number;
    style: object;
  }): JSX.Element => {
    const { index, style } = props;
    const coin = coins[index];
    return isItemLoaded(index) ? (
      <div
        style={style}
        className='flex flex-row items-center'
      >
        <CoinTableRow coin={coin} />
      </div>
    ) : (
      <div
        style={style}
        className='flex flex-row justify-center'
      >
        <Spinner />
      </div>
    );
  };

  useEffect(() => {
    if (currentPage > 1 && !showAll) {
      return;
    }
    if (!getCoins.isLoading && hasMore) {
      getCoins.mutate({ pageNumber: currentPage });
    }
  }, [currentPage]);
  useEffect(() => {
    if (getCoins.isLoading || !getCoins.data) {
      return;
    }
    if (getCoins.data.length > 0) {
      setCoins((prev: any[]) => [...prev, ...getCoins.data]);
    } else {
      console.log('set has more');
      setHasMore(false);
    }
  }, [getCoins.data, showAll]);

  return (
    <>
      <div className='flex flex-row items-center'>
        <div className='hidden md:block'>#</div>
        <div className='text-left'>Name</div>
        <div className='text-right'>Price (USD)</div>
        <div className='text-right'>24h Change (%)</div>
        <div className='text-right'>24h Volume (USD)</div>
        <div className='text-right'>Market Cap (USD)</div>
      </div>
      <div className={`h-[${RowHeight * 10}px] `}>
        <InfinityScroller
          itemCount={itemCount}
          isItemLoaded={isItemLoaded}
          itemSize={RowHeight}
          loadMoreItems={loadMoreItems}
          rowTemplate={RowTemplate}
        />
      </div>
    </>
  );
};

export default CoinList;
