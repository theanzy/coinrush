import { trpc } from '@/utils/trpc';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import CoinTableRow from './CoinTableRow';
import Spinner from './Spinner';

type CoinListProps = {
  showAll?: boolean;
};

const CoinList = ({ showAll = true }: CoinListProps) => {
  const observer = useRef<IntersectionObserver>();
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [coins, setCoins] = useState<any[]>([]);
  const coinsMutation = trpc.crypto.coins.useMutation();
  useEffect(() => {
    if (pageNumber > 1 && !showAll) {
      return;
    }
    if (!coinsMutation.isLoading && hasMore) {
      coinsMutation.mutate({ pageNumber });
    }
  }, [pageNumber]);
  useEffect(() => {
    if (coinsMutation.isLoading || !coinsMutation.data) {
      return;
    }
    if (coinsMutation.data.length > 0) {
      setCoins((prev: any[]) => [...prev, ...coinsMutation.data]);
    } else {
      console.log('set has more');
      setHasMore(false);
    }
  }, [coinsMutation.data, showAll]);

  const lastRowRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (coinsMutation.isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [coinsMutation.isLoading, hasMore]
  );
  return (
    <div>
      <table className='table w-full max-w-full table-auto bg-white text-center text-gray-800'>
        <thead className='bg-gray-20 border-b border-t'>
          <tr className='[&>th]:px-2 [&>th]:py-2'>
            <th>#</th>
            <th className='text-left'>Name</th>
            <th className='text-right'>Price (USD)</th>
            <th className='text-right'>24h Change (%)</th>
            <th className='text-right'>24h Volume (USD)</th>
            <th className='text-right'>Market Cap (USD)</th>
          </tr>
        </thead>

        <tbody>
          {(showAll ? coins : coins.slice(0, 10)).map((coin, i) => {
            if (coins.length === i + 1) {
              return (
                <tr
                  ref={lastRowRef}
                  key={coin.id}
                  className='border-b bg-white text-gray-800 [&>td]:py-3 [&>td]:px-2'
                >
                  <CoinTableRow coin={coin} />
                </tr>
              );
            }
            return (
              <tr
                key={coin.id}
                className='border-b bg-white text-gray-800 [&>td]:py-3 [&>td]:px-2'
              >
                <CoinTableRow coin={coin} />
              </tr>
            );
          })}
        </tbody>
      </table>
      {showAll && coinsMutation.isLoading && (
        <div className='flex flex-row items-center justify-center p-3'>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CoinList;
