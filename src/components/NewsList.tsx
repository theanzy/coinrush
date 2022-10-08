import React from 'react';
import News from './News';
const news = {
  title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, hic!',
  imageUrl: 'none',
  source: 'fxstreet',
  date: '2022-10-08T15:55:39.649Z',
};
const NewsList = () => {
  return (
    <section className='px-5 py-3'>
      <h2 className='mb-3 text-lg font-bold'>Latest News</h2>
      <div className='flex flex-col gap-5'>
        <News news={news} />
        <News news={news} />
        <News news={news} />
        <News news={news} />
      </div>
    </section>
  );
};

export default NewsList;
