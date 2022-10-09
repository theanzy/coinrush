import React from 'react';
import { useRouter } from 'next/router';
import InfoIcon from '@/components/InfoIcon';
const CryptoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <div className='flex flex-row gap-5'>
        <div className='w-fit p-2'>
          <div className='flex flex-row gap-1'>
            <div>image</div>
            <div>bitcoin</div>
            <div>btc</div>
          </div>
          <div>Rank 1</div>
          <div className='flex flex-row flex-wrap gap-1 [&>*]:rounded [&>*]:bg-gray-200 [&>*]:px-1.5'>
            <div>website</div>
            <div>source code</div>
            <div>whitepaper</div>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-2'>
          <div>
            <div>Bitcoin price (BTC)</div>
            <div className='flex flex-row items-center gap-4'>
              <div className='text-3xl font-bold'>$19,427.77</div>
              <div className='rounded-lg bg-red-600 p-1 text-sm text-white'>
                -0.46%
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-5'>
            <div>
              <div className='flex flex-row items-center gap-1 text-gray-500'>
                <h2>Market Cap</h2>
                <InfoIcon className='group  relative h-5 w-5' />
              </div>
              <div>$372,353,492,103</div>
              <div> -0.51%</div>
            </div>
            <div>
              <div className='flex flex-row items-center gap-1'>
                <h2>
                  Volume{' '}
                  <span className='rounded-md bg-gray-200 py-1 px-2 text-xs'>
                    24h
                  </span>
                </h2>
              </div>
              <div>$16,246,133,439</div>
              <div> -41.51%</div>
            </div>
            <div>
              <div className='flex flex-row gap-2'>
                <div className='flex flex-row items-center gap-1 text-gray-500'>
                  <h2>Max Supply</h2>
                  <InfoIcon className='h-5 w-5' />
                </div>
                <div>21,000,000</div>
              </div>
              <div className='flex flex-row gap-2'>
                <div className='flex flex-row items-center gap-1 text-gray-500'>
                  <h2>Total Supply</h2>
                  <InfoIcon className='h-5 w-5' />
                </div>
                <div>19,173,981</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>TODO chart</div>
      <div>TODO BTC to USD converter</div>
      <div>
        <h3> What is bitcoin (BTC)? </h3>
        <div>
          Bitcoin is a decentralized cryptocurrency originally described in a
          2008 whitepaper by a person, or group of people, using the alias
          Satoshi Nakamoto. It was launched soon after, in January 2009. Bitcoin
          is a peer-to-peer online currency, meaning that all transactions
          happen directly between equal, independent network participants,
          without the need for any intermediary to permit or facilitate them.
          Bitcoin was created, according to Nakamoto’s own words, to allow
          “online payments to be sent directly from one party to another without
          going through a financial institution.” Some concepts for a similar
          type of a decentralized electronic currency precede BTC, but Bitcoin
          holds the distinction of being the first-ever cryptocurrency to come
          into actual use
        </div>
      </div>
    </div>
  );
};

export default CryptoPage;
