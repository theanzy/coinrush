import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';

import parse from 'html-react-parser';
import {
  FaFacebook,
  FaGithub,
  FaInfoCircle,
  FaReddit,
  FaTwitter,
} from 'react-icons/fa';
import { trpc } from '@/utils/trpc';
import Image from 'next/image';
import Spinner from '@/components/Spinner';
import { currencyFormatter, numberFormatter } from '@/utils/format';

const CoinPriceChart = dynamic(import('@/components/CoinPriceChart'), {
  ssr: false,
});
const CoinPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const getCoin = trpc.crypto.getCoin.useMutation();
  useEffect(() => {
    if (router.isReady && id) {
      getCoin.mutate({ id: id as string });
    }
  }, [router.isReady, id]);

  return (
    <Layout>
      {getCoin.isLoading && (
        <div className='flex h-full w-full flex-grow items-center justify-center'>
          <Spinner />
        </div>
      )}
      {!getCoin.isLoading && !getCoin.isError && getCoin.data && (
        <div className='pb-10'>
          <div className='flex flex-col gap-5 border-b pb-10 md:flex-row'>
            <div className='mr-3 w-fit py-3 pl-2 pr-10'>
              <div className='flex flex-row gap-2'>
                <div>
                  <Image
                    className='cursor-pointer'
                    src={getCoin.data.image || '/defaultCoin.png'}
                    alt={getCoin.data.shortName}
                    width={45}
                    height={45}
                  />
                </div>
                <div className='flex flex-col items-start justify-center'>
                  <div className='text-xl font-bold capitalize'>
                    {getCoin.data.name}
                  </div>
                  <div className='text-sm uppercase text-gray-600'>
                    {getCoin.data.shortName}
                  </div>
                </div>
              </div>
              <div className='p-2'></div>
              <div className='text-lg font-bold text-gray-600'>
                Rank {getCoin.data.rank}
              </div>
              <div className='p-1'></div>
              <div className='flex flex-row flex-wrap gap-3 [&>*]:rounded [&>*]:bg-gray-200 [&>*]:px-3 [&>*]:py-1'>
                {getCoin.data.homepage && (
                  <a
                    href={getCoin.data.homepage}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Website
                  </a>
                )}
                {getCoin.data.github && (
                  <a
                    href={getCoin.data.github}
                    target='_blank'
                    rel='noreferrer'
                    className='flex flex-row items-center justify-center gap-2'
                  >
                    <FaGithub className='h-5 w-5' /> <div>Github</div>
                  </a>
                )}
                {getCoin.data.twitter && (
                  <a
                    href={`https://twitter.com/${getCoin.data.twitter}`}
                    target='_blank'
                    rel='noreferrer'
                    className='flex flex-row items-center justify-center gap-2'
                  >
                    <FaTwitter className='h-5 w-5' />
                    <div>{`@${getCoin.data.twitter}`}</div>
                  </a>
                )}
                {getCoin.data.facebook && (
                  <a
                    href={`https://facebook.com/${getCoin.data.facebook}`}
                    target='_blank'
                    rel='noreferrer'
                    className='flex flex-row items-center justify-center gap-2 gap-y-4'
                  >
                    <FaFacebook className='h-5 w-5' />
                    <div>{`@${getCoin.data.facebook}`}</div>
                  </a>
                )}
                <a
                  href={getCoin.data.reddit}
                  target='_blank'
                  rel='noreferrer'
                  className='flex flex-row items-center justify-center gap-1'
                >
                  <FaReddit className='h-5 w-5' />
                  <div>{`${getCoin.data.name}`}</div>
                </a>
              </div>
            </div>
            <div className='flex flex-grow flex-col gap-4 py-2'>
              <div className='border-b pb-5'>
                <div>
                  {getCoin.data.name} price{' '}
                  <span className='uppercase'>({getCoin.data.shortName})</span>
                </div>
                <div className='flex flex-row items-center gap-4'>
                  <div className='text-3xl font-bold'>{`${currencyFormatter.format(
                    getCoin.data.price
                  )}`}</div>
                  <div className='rounded-lg bg-red-600 p-1 text-sm text-white'>
                    {numberFormatter.format(getCoin.data.changePercentage24h)}%
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-start gap-10 md:flex-row'>
                <div>
                  <div className='flex flex-row justify-start gap-1'>
                    <h2 className='text-lg font-bold text-black'>Market Cap</h2>
                    <FaInfoCircle className=' text-gray-500' />
                  </div>
                  <div>{currencyFormatter.format(getCoin.data.marketCap)}</div>
                  <div
                    className={`${
                      getCoin.data.changePercentage24h < 0
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
                    {numberFormatter.format(
                      getCoin.data.marketCapChangePercentage24h
                    )}
                    %
                  </div>
                </div>
                <div>
                  <div className='flex flex-row items-center justify-start gap-2'>
                    <h2 className='text-lg font-bold text-black'>Volume</h2>
                    <span className='rounded-md bg-gray-200 py-1 px-2 text-xs'>
                      24h
                    </span>
                  </div>
                  <div>
                    {currencyFormatter.format(getCoin.data.totalVolume)}
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-row gap-2'>
                    <div className='flex flex-row gap-1 text-gray-500'>
                      <h2>Max Supply</h2>
                      <FaInfoCircle />
                    </div>
                    <div>
                      {currencyFormatter.format(getCoin.data.maxSupply)}
                    </div>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <div className='flex flex-row items-center gap-1 text-gray-500'>
                      <h2>Total Supply</h2>
                      <FaInfoCircle />
                    </div>
                    <div>
                      {currencyFormatter.format(getCoin.data.totalSupply)}
                    </div>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <div className='flex flex-row items-center gap-1 text-gray-500'>
                      <h2>Circulating Supply</h2>
                      <FaInfoCircle />
                    </div>
                    <div>
                      {currencyFormatter.format(getCoin.data.circulatingSupply)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='py-10 '>
            <CoinPriceChart
              coinName={getCoin.data.name}
              coinId={getCoin.data.id}
            />
          </div>
          <div>TODO BTC to USD converter</div>
          {getCoin.data.description.length > 0 && (
            <div>
              <h3 className='text-2xl font-bold'>
                What is {getCoin.data.name}
                <span className='uppercase'>
                  {' '}
                  ({getCoin.data.shortName}) ?{' '}
                </span>
              </h3>
              <div className='p-2'></div>
              <div className='leading-7'>{parse(getCoin.data.description)}</div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default CoinPage;
