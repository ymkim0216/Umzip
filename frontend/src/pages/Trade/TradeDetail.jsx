import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import TradeItemDetail from '../../components/Trade/TradeItemDetail';
import Header from '../../components/Header';
import Chat from '../../components/Chat/Chat';

import { api } from '../../services/api';

function TradeDetail() {
  const { tradeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [trade, setTrade] = useState({});
  const navigate = useNavigate();

  const getTrade = async () => {
    const response = await api.get(`/trade-items/detail/${tradeId}`);
    setTrade(response.data.result);
    setLoading(false);
  };

  useEffect(() => {
    getTrade();
    window.scrollTo(0, 0);
  }, [tradeId]);

  useEffect(() => {
    const handleScroll = () => {
      // Save the current scroll position when scrolling
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    const restoreScrollPosition = () => {
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
      }
    };

    // Attach event listener for scrolling
    window.addEventListener('scroll', handleScroll);

    // Restore scroll position when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      restoreScrollPosition();
    };
  }, []);

  return (
    <>
      <Header />
      <Chat />
      <div>
        {loading ? (
          <h2>loading...</h2>
        ) : (
          <div>{trade && <TradeItemDetail trade={trade} />}</div>
        )}
      </div>
    </>
  );
}

export default TradeDetail;
