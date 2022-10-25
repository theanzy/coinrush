import type { NextPage } from 'next';
import GlobalStats from '@/components/GlobalStats';
import CoinList from '@/components/CoinList';
import NewsList from '@/components/NewsList';
import ExchangeList from '@/components/ExchangeList';
import Layout from '@/components/Layout';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className='flex items-stretch justify-start'>
        <main className='flex w-full flex-col'>
          <GlobalStats />
          <section className='py-8'>
            <Link href='/coins'>
              <h2 className='mb-3 w-fit cursor-pointer text-lg font-bold hover:text-blue-600'>
                Coin price
              </h2>
            </Link>
            <CoinList showAll={false} />
          </section>
          <section className='py-8'>
            <Link href='/exchanges'>
              <h2 className='mb-3 w-fit cursor-pointer text-lg font-bold hover:text-blue-600'>
                Exchanges
              </h2>
            </Link>
            <ExchangeList showAll={false} />
          </section>
          <section className='py-8'>
            <Link href='/news'>
              <h2 className='mb-5 w-fit cursor-pointer text-xl font-bold hover:text-blue-600'>
                Latest News
              </h2>
            </Link>

            <NewsList showAll={false} />
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
