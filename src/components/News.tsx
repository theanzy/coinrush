import Image from 'next/image';
import React from 'react';
import moment from 'moment';
type News = {
  title: string;
  url: string;
  urlToImage: string;
  source: string;
  publishedAt: string;
  description: string;
};

type NewsProps = {
  news: News;
};

const hoursFromNow = (timestamp: string) => {
  const time = moment(timestamp);
  const now = moment();
  const diff = now.diff(time, 'hours');
  console.log(diff);
  if (diff >= 12) {
    return time.calendar(now);
  }
  return time.fromNow();
};
const News = ({ news }: NewsProps) => {
  return (
    <div className='flex flex-col gap-5 md:flex-row'>
      <a
        href={news.url}
        rel='noopener noreferrer'
        target='_blank'
        className='relative h-[150px] cursor-pointer overflow-hidden rounded-lg md:basis-1/5'
      >
        <Image
          className='cursor-pointer duration-75 hover:scale-110'
          src={news.urlToImage ?? '/static/images/article-placeholder.png'}
          alt={news.title}
          layout='fill'
        />
      </a>
      <div className='flex flex-col gap-1 md:basis-4/5'>
        <div className='cursor-pointer text-xl font-bold hover:text-blue-700'>
          <a
            href={news.url}
            rel='noopener noreferrer'
            target='_blank'
          >
            {news.title}
          </a>
        </div>
        <div className='hidden md:block'>
          {news.description?.slice(0, 300)}
          {news.description?.length > 300 ? '...' : ''}
        </div>
        <div className='flex flex-row gap-5 text-sm text-gray-500'>
          <div>{news.source}</div>
          <div>{hoursFromNow(news.publishedAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default News;
