import React from 'react';
import CoinList from '@/components/CoinList';
import Layout from '@/components/Layout';

const CryptosPage = () => {
  return (
    <Layout>
      <h2>Coins</h2>
      <CoinList />
    </Layout>
  );
};

export default CryptosPage;
