import type { NextPage } from 'next';
import GlobalStats from '@/components/GlobalStats';
import CoinList from '@/components/CoinList';
import NewsList from '@/components/NewsList';
import ExchangeList from '@/components/ExchangeList';
import Layout from '@/components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className='flex items-stretch justify-start '>
        <main className='flex w-full flex-col'>
          <GlobalStats />
          <section className='py-8'>
            <h2 className='mb-3 text-lg font-bold'>Cryptocurrency prices</h2>
            <CoinList showAll={false} />
          </section>
          <section className='py-8'>
            <h2 className='mb-3 text-lg font-bold'>Exchanges</h2>
            <ExchangeList showAll={false} />
          </section>
          <section className='py-8'>
            <NewsList showAll={false} />
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
