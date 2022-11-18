import { trpc } from '@/utils/trpc';
import React, { useState, useEffect } from 'react';
import CoinTableRow from './CoinTableRow';
import InfinityScroller from '@/components/InfinityScroller';
import Spinner from './Spinner';
import { Coin } from '@/types/coin';

type CoinListProps = {
  showAll?: boolean;
};
const ROW_HEIGHT = 70;

const CoinList = ({ showAll = true }: CoinListProps) => {
  const getCoins = trpc.crypto.coins.useMutation();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isItemLoaded = (index: number) => !hasMore || index < coins.length;
  const loadMoreItems = async (startIndex: number, stopIndex: number) => {
    if (!getCoins.isLoading && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const RowTemplate = (props: {
    index: number;
    style?: object;
  }): JSX.Element => {
    const { index, style } = props;
    const coin = coins[index];
    return isItemLoaded(index) && coin ? (
      <div
        style={style}
        className='grid min-w-[750px] grid-cols-[4%_25%_17%_18%_17%_17%_2%] border-b [&>div]:flex [&>div]:flex-row [&>div]:items-center'
      >
        <CoinTableRow coin={coin} />
      </div>
    ) : (
      <div
        style={style}
        className='flex flex-row justify-center py-2'
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
      getCoins.mutate({ pageNumber: currentPage, limit: 50 });
    }
  }, [currentPage]);
  useEffect(() => {
    if (getCoins.isLoading || !getCoins.data) {
      return;
    }
    if (getCoins.data.length > 0) {
      setCoins((prev: any[]) => [...prev, ...getCoins.data]);
    } else {
      setHasMore(false);
    }
  }, [getCoins.data, showAll]);

  return (
    <div className='custom-scrollbar overflow-x-auto'>
      <div className='min-w-[750px]'>
        <div className='grid grid-cols-[4%_25%_17%_18%_17%_17%_2%] border-b border-t py-2 font-bold [&>div]:flex [&>div]:flex-row [&>div]:items-center'>
          <div>#</div>
          <div>Name</div>
          <div>Price (USD)</div>
          <div className='justify-self-end text-right'>24h Change (%)</div>
          <div className='justify-self-end text-right'>24h Volume (USD)</div>
          <div className='justify-self-end text-right'>Market Cap (USD)</div>
        </div>
        {getCoins.isError ? (
          <div className='mx-auto my-3 flex flex-row justify-center text-red-500'>
            No data for coins
          </div>
        ) : null}
        {showAll ? (
          <div className={`${coins.length === 0 ? 'h-[70px]' : 'h-[700px]'}`}>
            <InfinityScroller
              itemCount={hasMore ? coins.length + 1 : coins.length}
              isItemLoaded={isItemLoaded}
              itemSize={ROW_HEIGHT}
              loadMoreItems={loadMoreItems}
              rowTemplate={RowTemplate}
            />
          </div>
        ) : (
          <>
            {getCoins.isLoading && (
              <div className='flex flex-row justify-center p-2'>
                <Spinner />
              </div>
            )}
            {coins.slice(0, 10).map((c: Coin, i: number) => (
              <RowTemplate
                key={c.name}
                index={i}
                style={{ height: ROW_HEIGHT }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CoinList;
