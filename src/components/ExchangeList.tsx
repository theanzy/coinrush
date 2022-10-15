import { trpc } from '@/utils/trpc';
import React, { useEffect, useState } from 'react';
import { Exchange } from '@/types/coin';
import Pagination from '@/components/Pagination/Pagination';
import { formatUrl } from '@/utils/format';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from './Spinner';

type ExchangeListProps = {
  showAll?: boolean;
};
const PAGE_SIZE = 10;
const ExchangeList = ({ showAll = true }: ExchangeListProps) => {
  const getExchanges = trpc.crypto.getExchanges.useMutation();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalNumber, setTotalNumber] = useState<number | undefined | null>();
  const [exchanges, setExchanges] = useState<Record<number, Exchange[]>>();
  useEffect(() => {
    if (exchanges && exchanges[pageNumber]) {
      return;
    }
    getExchanges
      .mutateAsync({
        totalNumber: totalNumber,
        pageNumber: pageNumber,
        perPage: PAGE_SIZE,
      })
      .then((response) => {
        setTotalNumber(response.total);
        setExchanges((prev) => ({
          ...prev,
          [pageNumber]: response.data,
        }));
      });
  }, [pageNumber, totalNumber, showAll, exchanges]);

  return (
    <div>
      <table className='table min-w-full table-auto bg-white text-center  text-gray-800'>
        <thead className='bg-gray-20 border-b border-t'>
          <tr className='[&>th]:px-2 [&>th]:py-1'>
            <th>#</th>
            <th className='text-left'>Name</th>
            <th className='text-right'>Trust Score</th>
            <th className='text-right'>24h Trade Volume (BTC)</th>
          </tr>
        </thead>
        {exchanges && (
          <tbody>
            {exchanges[pageNumber]?.map((exchange) => (
              <tr
                key={exchange.name}
                className='border-b bg-white text-gray-800 [&>td]:py-1 [&>td]:px-1'
              >
                <td>{exchange.rank}</td>
                <td>
                  <div className='flex items-center py-2'>
                    <Link href={formatUrl(exchange.url)}>
                      <a
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        <Image
                          className='cursor-pointer'
                          src={
                            exchange.imageUrl ||
                            '/static/images/defaultCoin.png'
                          }
                          alt={exchange.name}
                          width={45}
                          height={45}
                        />
                      </a>
                    </Link>
                    <div className='ml-4 flex items-center'>
                      {exchange.name}
                    </div>
                  </div>
                </td>
                <td className='text-right'>{exchange.trustScore}</td>
                <td className='text-right'>
                  {exchange.tradeVolume24hBTC.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {getExchanges.isLoading && (
        <div className='flex flex-row items-center justify-center py-10'>
          <Spinner />
        </div>
      )}
      {totalNumber && showAll && (
        <div className='flex flex-row items-end justify-end py-8 pt-4'>
          <Pagination
            currentPage={pageNumber}
            onPageChange={(page) => setPageNumber(page)}
            totalCount={totalNumber}
            pageSize={PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
};

export default ExchangeList;
