import Layout from '@/components/Layout';
import NewsList from '@/components/NewsList';
import React from 'react';

const NewsPage = () => {
  return (
    <Layout>
      <div className='mb-24'>
        <h2 className='mb-3 text-xl font-bold'>Latest News</h2>
        <NewsList showAll={true} />
      </div>
    </Layout>
  );
};

export default NewsPage;
