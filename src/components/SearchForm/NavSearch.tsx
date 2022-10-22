import React, { useEffect, useMemo, useState } from 'react';
import useClickOutside from 'src/hooks/useClickOutside';
import FakeSearchBar from './FakeSearchBar';
import NavSearchForm from './NavSearchForm';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { trpc } from '@/utils/trpc';
import { Coin, Exchange } from '@/types/coin';
import { useDebounce } from 'src/hooks/useDebounce';
import CoinListItem from '../CoinListItem';
import ExchangeListItem from '../ExchangeListItem';
const NavSearch = () => {
  const getTrending = trpc.crypto.trending.useQuery();
  const searchCrypto = trpc.crypto.search.useMutation();

  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchCoinError, setSearchCoinError] = useState('');
  const [exchanges, setExchanges] = useState<Exchange[]>([]);

  useEffect(() => {
    if (debouncedSearchText.trim().length === 0) {
      return;
    }
    searchCrypto
      .mutateAsync({ searchText: debouncedSearchText })
      .then((result) => {
        if (result.coins.length > 0) {
          setCoins(result.coins);
          setSearchCoinError('');
        } else {
          setSearchCoinError('No result');
          setCoins([]);
        }
        setExchanges(result.exchanges);
      });
  }, [debouncedSearchText]);

  const filteredCoins = useMemo<Coin[]>(() => {
    if (
      debouncedSearchText.trim().length === 0 ||
      searchText.trim().length === 0
    ) {
      return [];
    }
    return coins;
  }, [debouncedSearchText, searchText, coins]);

  const filteredExchanges = useMemo<Exchange[]>(() => {
    if (
      debouncedSearchText.trim().length === 0 ||
      searchText.trim().length === 0
    ) {
      return [];
    }
    return exchanges;
  }, [searchText, debouncedSearchText, exchanges]);

  const filteredTrendingCoins = useMemo<Coin[]>(() => {
    if (
      coins.length > 0 &&
      exchanges.length > 0 &&
      searchText.trim().length > 0
    ) {
      return [];
    } else if (searchText.trim().length > 0) {
      return [];
    }
    return getTrending.data?.coins ?? [];
  }, [searchText, coins, exchanges, getTrending.data?.coins]);

  const searchBoxRef = useClickOutside<HTMLDivElement>(() => {
    setOpenSearchBox(false);
  });
  return (
    <div className='flex flex-row items-center gap-2 pr-5'>
      <div className='relative flex flex-row'>
        <FakeSearchBar
          onClick={() => {
            setOpenSearchBox(true);
          }}
        />
        {openSearchBox ? (
          <div
            ref={searchBoxRef}
            className='fixed top-0 right-0 z-10 flex h-screen max-h-screen w-screen cursor-context-menu flex-col rounded-md border border-gray-200 bg-white pl-5 shadow md:absolute md:top-[-2%] md:right-[-1%] md:h-fit md:max-h-[450px] md:w-[400px] md:pl-0'
          >
            <div className='flex flex-row items-center'>
              <NavSearchForm
                text={searchText}
                onChange={(text) => setSearchText(text)}
              />
              <button
                className='z-20 px-3 py-2 text-[1.25rem] text-gray-400 hover:text-gray-600'
                type='button'
                onClick={() => {
                  setOpenSearchBox(false);
                }}
              >
                <IoCloseCircleOutline />
              </button>
            </div>
            <div className='scrollbar flex flex-col gap-4 overflow-y-auto text-sm text-gray-600'>
              {filteredTrendingCoins.length > 0 && (
                <div>
                  <h1 className='mb-1 border-b px-3 pb-1 text-sm text-gray-500'>
                    Trending🔥
                  </h1>
                  <ul className='flex flex-col'>
                    {filteredTrendingCoins.map((coin) => (
                      <CoinListItem
                        key={coin.id}
                        coin={coin}
                        onClick={() => {
                          setOpenSearchBox(false);
                        }}
                      />
                    ))}
                  </ul>
                </div>
              )}
              {(filteredCoins.length > 0 || searchCoinError.length > 0) && (
                <div>
                  <h1 className='mb-1 border-b px-3 pb-1 text-sm text-gray-500'>
                    Coins
                  </h1>
                  {searchCoinError.length > 0 && (
                    <h1 className='mb-1  px-10 pb-1 text-sm text-gray-500'>
                      {searchCoinError}
                    </h1>
                  )}
                  <ul className='flex flex-col'>
                    {filteredCoins.map((coin) => (
                      <CoinListItem
                        key={coin.id}
                        coin={coin}
                        onClick={() => {
                          setOpenSearchBox(false);
                        }}
                      />
                    ))}
                  </ul>
                </div>
              )}
              {filteredExchanges.length > 0 && (
                <div>
                  <h1 className='mb-1 border-b px-3 pb-1 text-sm text-gray-500'>
                    Exchanges
                  </h1>
                  <ul className='flex flex-col'>
                    {filteredExchanges.map((exchange) => (
                      <ExchangeListItem
                        key={exchange.id}
                        onClick={() => setOpenSearchBox(false)}
                        exchange={exchange}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavSearch;
