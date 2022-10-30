import { Ticker } from '@/types/coin';
import { formatCurrency } from '@/utils/format';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import useIsMobile from 'src/hooks/useIsMobile';
import Pagination from './Pagination/Pagination';

type TickerListProps = {
  tickers: Ticker[];
};

function TickerList({ tickers }: TickerListProps) {
  const isMobile = useIsMobile();
  return (
    <div className='w-full'>
      <table className='table w-full min-w-full table-auto bg-white text-center text-gray-800'>
        <thead className='bg-gray-20 border-b border-t'>
          <tr className='[&>th]:px-1 [&>th]:py-2'>
            <th className='px-0 text-left'>#</th>
            <th className='text-left'>Currency</th>
            <th className='text-left'>Pair</th>
            <th className='text-right'>Price (USD)</th>
            <th className='text-right'>Volume (USD)</th>
          </tr>
        </thead>
        {tickers && (
          <tbody>
            {tickers?.map((ticker) => (
              <tr
                key={`${ticker.base}/${ticker.target}`}
                className='border-b bg-white text-gray-800 [&>td]:py-2 [&>td]:px-1'
              >
                <td className='px-0 text-left'>{ticker.num}</td>
                <td className='text-left font-semibold capitalize'>
                  <Link href={`/coins/${ticker.baseCoinId}`}>
                    <a>{ticker.base}</a>
                  </Link>
                </td>
                <td className='text-left font-semibold'>
                  <a
                    href={ticker.tradeUrl}
                    target='__blank'
                  >{`${ticker.base}/${ticker.target}`}</a>
                </td>
                <td className='text-right'>
                  {formatCurrency(
                    'USD',
                    isMobile ? 'compact' : 'standard'
                  )(ticker.price)}
                </td>
                <td className='text-right'>
                  {formatCurrency(
                    'USD',
                    isMobile ? 'compact' : 'standard'
                  )(ticker.volume)}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

const PAGE_SIZE = 20;

function TickerWithPaginate({ tickers }: TickerListProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const totalNumber = tickers.length;
  const filteredTickers = useMemo(() => {
    const start = (pageNumber - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, tickers.length);
    return tickers.slice(start, end);
  }, [pageNumber, tickers]);
  return (
    <>
      <TickerList tickers={filteredTickers} />
      <div className='flex flex-row items-end justify-end py-8 pt-4'>
        <Pagination
          currentPage={pageNumber}
          onPageChange={(page) => setPageNumber(page)}
          totalCount={totalNumber}
          pageSize={PAGE_SIZE}
        />
      </div>
    </>
  );
}

export default TickerWithPaginate;
