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
import { formatCurrency, formatPercentage } from '@/utils/format';
import useIsMobile from 'src/hooks/useIsMobile';
import News from '@/components/News';

const CoinPriceChart = dynamic(import('@/components/CoinPriceChart'), {
  ssr: false,
});
const CoinPage = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { id } = router.query;

  const getCoin = trpc.crypto.getCoin.useMutation();
  useEffect(() => {
    if (router.isReady && id) {
      getCoin.mutate({ id: id as string });
    }
  }, [router.isReady, id]);
  const getNews = trpc.news.getNews.useMutation();

  useEffect(() => {
    if (!getCoin.data?.name) {
      return;
    }
    getNews.mutate({
      pageNumber: 1,
      perPage: 5,
      searchText: getCoin.data.name,
    });
  }, [getCoin.data?.name]);

  console.log(getNews.data);
  return (
    <Layout>
      {getCoin.isLoading && (
        <div className='flex h-full w-full flex-grow items-center justify-center'>
          <Spinner />
        </div>
      )}
      <div>
        {!getCoin.isLoading && !getCoin.isError && getCoin.data && (
          <div className='pb-10'>
            <div className='flex flex-col gap-5 border-b pb-10 md:flex-row'>
              <div className='w-fit py-3 pl-2 pr-10'>
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
                    <span className='uppercase'>
                      ({getCoin.data.shortName})
                    </span>
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <div className='text-3xl font-bold'>{`${formatCurrency(
                      'USD',
                      isMobile ? 'compact' : 'standard'
                    )(getCoin.data.price)}`}</div>
                    <div
                      className={`${
                        getCoin.data.changePercentage24h < 0
                          ? 'bg-red-600'
                          : 'bg-green-600'
                      } rounded-lg p-1 text-sm text-white`}
                    >
                      {formatPercentage(getCoin.data.changePercentage24h)}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-start gap-10 md:flex-row'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row justify-start gap-1'>
                      <h2 className='text-lg font-bold text-black'>
                        Market Cap
                      </h2>
                      <div className='tooltip text-md my-auto'>
                        <FaInfoCircle className='text-gray-500' />
                        <span className='tooltiptext text-sm'>
                          The total market value of a cryptocurrency&apos;s
                          circulating supply. It is analogous to the free-float
                          capitalization in the stock market. Market Cap =
                          Current Price x Circulating Supply.
                        </span>
                      </div>
                    </div>
                    <div>
                      {formatCurrency(
                        'USD',
                        isMobile ? 'compact' : 'standard'
                      )(getCoin.data.marketCap)}
                    </div>
                    <div
                      className={`${
                        getCoin.data.changePercentage24h < 0
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      {formatPercentage(
                        getCoin.data.marketCapChangePercentage24h
                      )}
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
                      {formatCurrency(
                        'USD',
                        isMobile ? 'compact' : 'standard'
                      )(getCoin.data.totalVolume)}
                    </div>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div className='flex flex-row gap-2'>
                      <div className='flex flex-row gap-1 text-gray-500'>
                        <h2>Max Supply</h2>
                        <div className='tooltip text-md my-auto'>
                          <FaInfoCircle className=' text-gray-500' />
                          <span className='tooltiptext text-sm'>
                            The maximum amount of coins that will ever exist in
                            the lifetime of the cryptocurrency. It is analogous
                            to the fully diluted shares in the stock market. If
                            this data has not been submitted by the project or
                            verified by the CMC team, max supply shows - -.
                          </span>
                        </div>
                      </div>
                      <div>
                        {formatCurrency(
                          'USD',
                          isMobile ? 'compact' : 'standard'
                        )(getCoin.data.maxSupply)}
                      </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                      <div className='flex flex-row items-center gap-1 text-gray-500'>
                        <h2>Total Supply</h2>
                        <div className='tooltip text-md my-auto'>
                          <FaInfoCircle className=' text-gray-500' />
                          <span className='tooltiptext text-sm'>
                            The amount of coins that have been already created,
                            minus any coins that have been burned. It is
                            analogous to the outstanding shares in the stock
                            market. If this data has not been submitted by the
                            project or verified by the CMC team, total supply
                            shows - -.
                          </span>
                        </div>
                      </div>
                      <div>
                        {formatCurrency(
                          'USD',
                          isMobile ? 'compact' : 'standard'
                        )(getCoin.data.totalSupply)}
                      </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                      <div className='flex flex-row items-center gap-1 text-gray-500'>
                        <h2>Circulating Supply</h2>
                        <div className='tooltip text-md my-auto'>
                          <FaInfoCircle className=' text-gray-500' />
                          <span className='tooltiptext text-sm'>
                            The amount of coins that are circulating in the
                            market and are in public hands. It is analogous to
                            the flowing shares in the stock market.
                          </span>
                        </div>
                      </div>
                      <div>
                        {formatCurrency(
                          'USD',
                          isMobile ? 'compact' : 'standard'
                        )(getCoin.data.circulatingSupply)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-6 md:flex-row'>
              <div className='md:w-2/3'>
                <CoinPriceChart
                  coinName={getCoin.data.name}
                  coinId={getCoin.data.id}
                  shortName={getCoin.data.shortName}
                />
              </div>
              <div className='pt-2 md:w-1/3'>
                <h3 className='mb-5 text-xl font-bold'>
                  Latest News on {getCoin.data.name}
                </h3>
                {getNews.isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div className='mx-0 flex w-full flex-col gap-5'>
                    {getNews.data && getNews.data.data.length > 0 ? (
                      getNews.data.data.map((news, i) => (
                        <News
                          key={i}
                          news={news}
                          compact={true}
                        />
                      ))
                    ) : (
                      <div>Nothing new...</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className='p-10'></div>
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
                <div className=' leading-7 [&>a]:text-blue-600'>
                  {parse(getCoin.data.description)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CoinPage;
