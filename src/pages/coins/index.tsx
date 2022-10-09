import React from 'react';
import CoinList from '@/components/CoinList';
import Layout from '@/components/Layout';

const CryptosPage = () => {
  return (
    <Layout>
      <h2 className='text-2xl font-bold'>Coins</h2>
      <div className='p-2' />
      <CoinList />
    </Layout>
  );
};

export default CryptosPage;
