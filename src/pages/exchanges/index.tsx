import ExchangeList from '@/components/ExchangeList';
import Layout from '@/components/Layout';
import React from 'react';

const ExchangesPage = () => {
  return (
    <Layout>
      <h2 className='text-2xl font-bold'>Exchanges</h2>
      <div className='p-2' />
      <ExchangeList />
    </Layout>
  );
};

export default ExchangesPage;
