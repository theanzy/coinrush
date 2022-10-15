import { trpc } from '@/utils/trpc';
import { useState, useEffect } from 'react';
import News from './News';
import Pagination from './Pagination/Pagination';
import Spinner from './Spinner';

type NewsListProps = {
  showAll?: boolean;
};
const PAGE_SIZE = 10;
const NewsList = ({ showAll = false }: NewsListProps) => {
  const getNews = trpc.news.getNews.useMutation();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalNumber, setTotalNumber] = useState<number | undefined | null>();
  const [news, setNews] = useState<Record<number, News[]>>();
  useEffect(() => {
    if (news && news[pageNumber]) {
      return;
    }
    getNews
      .mutateAsync({
        pageNumber: pageNumber,
        perPage: PAGE_SIZE,
      })
      .then((response) => {
        setTotalNumber(response.total);
        setNews((prev) => ({
          ...prev,
          [pageNumber]: response.data,
        }));
      });
  }, [pageNumber, totalNumber, showAll, news]);

  return (
    <>
      <h2 className='mb-3 text-xl font-bold'>Latest News</h2>
      {news && (
        <div className='flex flex-col gap-10'>
          {news[pageNumber]?.map((news, i) => (
            <News
              key={i}
              news={news}
            />
          ))}
        </div>
      )}
      {getNews.isLoading && (
        <div className='flex flex-row items-center justify-center py-10'>
          <Spinner />
        </div>
      )}
      {news && news[pageNumber]?.length === 0 && (
        <div className='flex flex-row justify-center p-10 text-red-600'>
          No more news
        </div>
      )}
      {getNews.isError && (
        <div className='flex flex-row justify-center p-10 text-red-600'>
          Error loading news
        </div>
      )}
      {totalNumber && showAll && (
        <div className='flex flex-row items-end justify-end py-8 pt-4'>
          <Pagination
            currentPage={pageNumber}
            onPageChange={(page) => setPageNumber(page)}
            totalCount={totalNumber}
            pageSize={PAGE_SIZE}
          />
        </div>
      )}
    </>
  );
};

export default NewsList;
