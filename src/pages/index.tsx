import type { NextPage } from 'next';
import GlobalStats from '@/components/GlobalStats';
import Sidepane from '@/components/Sidepane';
import CryptoList from '@/components/CryptoList';

const Home: NextPage = () => {
  return (
    <div className='flex h-screen w-screen items-stretch justify-start overflow-hidden'>
      <Sidepane />
      <main className='flex h-screen w-full flex-col'>
        <GlobalStats />
        <div className='px-2 py-3'>
          <h2 className='text-lg font-bold'>Cryptocurrency prices</h2>
          <div className='flex px-4 py-2'>
            <CryptoList showAll={false} />
          </div>
        </div>
        <section className='bg-slate-100'>crypto news</section>
      </main>
    </div>
  );
};

export default Home;
