import ExchangeList from '@/components/ExchangeList';
import Layout from '@/components/Layout';
import React from 'react';

const ExchangesPage = () => {
  return (
    <Layout>
      <h2>Exchanges</h2>
      <ExchangeList />
    </Layout>
  );
};

export default ExchangesPage;
