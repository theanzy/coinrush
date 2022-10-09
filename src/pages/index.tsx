import type { NextPage } from 'next';
import GlobalStats from '@/components/GlobalStats';
import Sidepane from '@/components/Sidepane';
import CryptoList from '@/components/CryptoList';
import NewsList from '@/components/NewsList';
import ExchangeList from '@/components/ExchangeList';

const Home: NextPage = () => {
  return (
    <div className='flex items-stretch justify-start '>
      <Sidepane />
      <main className='flex w-full flex-col'>
        <GlobalStats />
        <div className='px-5 py-3'>
          <h2 className='mb-3 text-lg font-bold'>Cryptocurrency prices</h2>
          <CryptoList showAll={false} />
        </div>
        <div className='px-5 py-3'>
          <h2 className='mb-3 text-lg font-bold'>Exchanges</h2>
          <ExchangeList showAll={false} />
        </div>
        <NewsList />
      </main>
    </div>
  );
};

export default Home;
