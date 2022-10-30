import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';
import { formatCurrency, numberFormatter } from '@/utils/format';
import { trpc } from '@/utils/trpc';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaFacebook, FaReddit, FaTag, FaTwitter } from 'react-icons/fa';
import parse from 'html-react-parser';
import TickerList from '@/components/TickerList';

function ExchangePage() {
  const router = useRouter();
  const { id } = router.query;

  const getExchange = trpc.crypto.getExchange.useMutation();
  useEffect(() => {
    if (router.isReady && id) {
      getExchange.mutate({ id: id as string });
    }
  }, [router.isReady, id]);

  return (
    <Layout>
      <div className='p-2'></div>
      {getExchange.isLoading ? (
        <div className='mx-auto flex flex-row'>
          <Spinner />
        </div>
      ) : null}
      {!getExchange.isLoading && getExchange.data ? (
        <>
          <div className='flex flex-col gap-5 pb-3 md:flex-row'>
            <div className='w-full md:w-[30%]'>
              <div className='flex flex-row items-center gap-3'>
                <Image
                  width={40}
                  height={40}
                  alt={getExchange.data.name}
                  src={getExchange.data.imageUrl}
                />
                <h2 className='text-xl font-bold'>{getExchange.data.name}</h2>
              </div>
              <div className='py-3 text-xl'>
                <div className='flex flex-row items-center gap-4 text-gray-500'>
                  <h2 className='font-bold'>Rank {getExchange.data.rank}</h2>
                  <div className='my-auto flex flex-row items-center gap-1 text-sm'>
                    <FaTag />
                    <p>Exchange</p>
                  </div>
                </div>
                <div className='flex flex-row flex-wrap gap-3 py-2 text-base [&>*]:rounded [&>*]:bg-gray-200 [&>*]:px-3 [&>*]:py-1'>
                  {getExchange.data.url?.trim().length > 0 ? (
                    <a
                      href={getExchange.data.url}
                      target='_blank'
                      rel='noreferrer'
                    >
                      Website
                    </a>
                  ) : null}
                  {getExchange.data.twitterHandle?.trim().length > 0 ? (
                    <a
                      href={`https://twitter.com/${getExchange.data.twitterHandle}`}
                      target='_blank'
                      rel='noreferrer'
                      className='flex flex-row items-center justify-center gap-2'
                    >
                      <FaTwitter className='h-5 w-5' />
                      <div>{`@${getExchange.data.twitterHandle}`}</div>
                    </a>
                  ) : null}
                  {getExchange.data.facebook?.trim().length > 0 ? (
                    <a
                      href={`${getExchange.data.facebook}`}
                      target='_blank'
                      rel='noreferrer'
                      className='flex flex-row items-center justify-center gap-2 gap-y-4'
                    >
                      <FaFacebook className='h-5 w-5' />
                      <p>Facebook</p>
                    </a>
                  ) : null}
                  {getExchange.data.reddit?.trim().length > 0 ? (
                    <a
                      href={`${getExchange.data.reddit}`}
                      target='_blank'
                      rel='noreferrer'
                      className='flex flex-row items-center justify-center gap-2 gap-y-4'
                    >
                      <FaReddit className='h-5 w-5' />
                      <p>Reddit</p>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-row items-center justify-start gap-2'>
                <h2 className='text-lg'>Volume</h2>
                <span className='rounded-md bg-gray-200 py-1 px-2 text-xs'>
                  24h
                </span>
              </div>
              <p className='text-2xl font-bold'>
                {formatCurrency(
                  'USD',
                  'standard'
                )(getExchange.data.tradeVolume24hUSD)}
              </p>
              <p className='pt-1 text-gray-600'>
                {numberFormatter.format(getExchange.data.tradeVolume24hBTC)} BTC
              </p>
              {getExchange.data.description.length > 0 ? (
                <div className='pt-3'>
                  <h2 className='text-large font-bold'>
                    About {getExchange.data.name}
                  </h2>
                  <p className='pt-1 leading-7 [&>a]:text-blue-600'>
                    {parse(getExchange.data.description)}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <div className='pt-3 pb-4'>
            <div className='flex flex-row gap-3 pb-4'>
              <h2 className='text-2xl font-bold'>Market</h2>
              <h3 className='text-base font-semibold'>Spot</h3>
            </div>
            <TickerList tickers={getExchange.data.tickers} />
          </div>
        </>
      ) : null}
    </Layout>
  );
}

export default ExchangePage;
