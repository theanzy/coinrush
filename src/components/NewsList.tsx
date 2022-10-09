import React from 'react';
import News from './News';
const news = {
  title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, hic!',
  imageUrl: 'none',
  source: 'fxstreet',
  date: '2022-10-08T15:55:39.649Z',
};

type NewsListProps = {
  showAll?: boolean;
};

const NewsList = ({ showAll = false }: NewsListProps) => {
  return (
    <>
      <h2 className='mb-3 text-lg font-bold'>Latest News</h2>
      <div className='flex flex-col gap-5'>
        <News news={news} />
        <News news={news} />
        <News news={news} />
        <News news={news} />
      </div>
    </>
  );
};

export default NewsList;
