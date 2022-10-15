import Layout from '@/components/Layout';
import NewsList from '@/components/NewsList';
import React from 'react';

const NewsPage = () => {
  return (
    <Layout>
      <div className='mb-24'>
        <NewsList showAll={true} />
      </div>
    </Layout>
  );
};

export default NewsPage;
