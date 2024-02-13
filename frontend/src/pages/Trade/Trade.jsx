import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTradeDetailsStore from '../../store/tradeDetailStore';

import TradesList from '../../components/Trade/TradesList';
import SearchBar from '../../components/Trade/SearchBar';
import Header from '../../components/Header';
import Chat from '../../components/Chat/Chat';
import classes from './Trade.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { api } from '../../services/api';

function Trade() {
  const navigate = useNavigate();
  const [trades, setTrades] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 12; // Set the number of items per page
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const tradeDetailsStore = useTradeDetailsStore();

  const getTrades = async () => {
    setLoading(true);
    try {
      const queryString = `keyword=${searchTerm}&page=${page}&size=${pageSize}`;
      const response = await api.get(`/trade-items?${queryString}`);
      const newTrades = response.data.result || [];

      // Append new trades to the existing list
      setTrades((prevTrades) => [...prevTrades, ...newTrades]);
      // Check if there are more trades to load
      setHasMore(newTrades.length === pageSize);
    } catch (error) {
      console.error('Failed to fetch trades', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrades(); // Fetch initial trades or trades after searchTerm change
  }, [searchTerm, page]); // Fetch trades when searchTerm changes

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (term) => {
    setTrades([]); // Clear existing trades before searching
    setPage(1); // Reset to the first page
    setSearchTerm(term); // Update searchTerm which triggers useEffect to fetch trades
  };

  return (
    <>
      <Header />
      <Chat />
      <article style={{ marginTop: '4rem' }}>
        <h1>중고 거래</h1>
        <SearchBar onSearch={handleSearch} />
        {trades.length > 0 ? (
          <>
            <TradesList trades={trades} />
            {hasMore && (
              <div className={classes.more}>
                <button
                  onClick={handleLoadMore}
                  className={classes.moreBtn}
                  disabled={loading}
                >
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    style={{ paddingRight: '10px' }}
                  />
                  더보기
                </button>
              </div>
            )}
          </>
        ) : (
          <p>검색결과가 없습니다.</p>
        )}
        <p>
          <button
            onClick={() => navigate('/tradewriting')}
            className={classes.writing}
          >
            글 쓰기
          </button>
        </p>
      </article>
    </>
  );
}

export default Trade;
