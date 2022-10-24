import { trpc } from '@/utils/trpc';
import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
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
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log('fetch again');
    if (news && news[pageNumber]) {
      return;
    }
    if (getNews.isLoading) {
      return;
    }
    console.log('fetch again', getNews.isLoading);

    getNews
      .mutateAsync({
        pageNumber: pageNumber,
        perPage: PAGE_SIZE,
        searchText: inputRef.current?.value,
      })
      .then((response) => {
        setTotalNumber(response.total);
        setNews((prev) => ({
          ...prev,
          [pageNumber]: response.data,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pageNumber, totalNumber, showAll, news]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getNews
      .mutateAsync({
        pageNumber: 1,
        perPage: PAGE_SIZE,
        searchText: inputRef.current?.value,
      })
      .then((response) => {
        setPageNumber(1);
        setTotalNumber(response.total);
        setNews({
          1: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {showAll && (
        <form
          className='flex w-auto flex-row '
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Search'
            ref={inputRef}
            className='ml-auto block rounded-l-md border border-r-0 px-2 text-gray-600 outline-none focus-within:border-blue-300 hover:border-blue-300'
          />
          <button
            type='submit'
            className='rounded-r-md bg-blue-500 p-3 text-white outline-blue-200 hover:bg-blue-700'
          >
            <FaSearch />
          </button>
        </form>
      )}
      <div className='p-3'></div>
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
      {(totalNumber === 0 || !news?.[pageNumber]) && !getNews.isLoading ? (
        <div className='flex flex-row justify-center p-10 text-red-600'>
          No more news
        </div>
      ) : null}
      {totalNumber && totalNumber > 0 && showAll ? (
        <div className='flex flex-row items-end justify-end py-8 pt-4'>
          <Pagination
            currentPage={pageNumber}
            onPageChange={(page) => setPageNumber(page)}
            totalCount={totalNumber}
            pageSize={PAGE_SIZE}
          />
        </div>
      ) : null}
    </>
  );
};

export default NewsList;
