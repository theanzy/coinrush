import React from 'react';

type News = {
  title: string;
  imageUrl: string;
  source: string;
  date: string;
};

type NewsProps = {
  news: News;
};

const News = ({ news }: NewsProps) => {
  return (
    <div className='flex flex-col'>
      <div className='mb-3 flex flex-row  gap-3'>
        <div className='h-20 w-20 bg-red-100 hover:cursor-pointer'>
          {news.imageUrl}
        </div>
        <div className='flex flex-col gap-1'>
          <div className='text-large font-bold hover:cursor-pointer hover:text-blue-700'>
            {news.title}
          </div>
          <div className='flex gap-5'>
            <div>{news.source}</div>
            <div>{news.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
