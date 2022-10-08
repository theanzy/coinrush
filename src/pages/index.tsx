import type { NextPage } from 'next';
import GlobalStats from '@/components/GlobalStats';
import Sidepane from '@/components/Sidepane';
import CryptoList from '@/components/CryptoList';
import NewsList from '@/components/NewsList';

const Home: NextPage = () => {
  return (
    <div className='flex items-stretch justify-start bg-slate-100'>
      <Sidepane />
      <main className='flex w-full flex-col'>
        <GlobalStats />
        <div className='px-5 py-3'>
          <h2 className='text-lg font-bold'>Cryptocurrency prices</h2>
          <div className='flex px-4 py-2'>
            <CryptoList showAll={false} />
          </div>
        </div>
        <NewsList />
      </main>
    </div>
  );
};

export default Home;
