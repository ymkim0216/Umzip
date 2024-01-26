import { useParams } from 'react-router-dom';

import TradeItem from '../../components/Trade/TradeItem';
import TradesList from '../../components/Trade/TradesList';

function TradeDetail({ trade }) {
  const params = useParams();

  return (
    <>
      <p>{params.tradeId}</p>
      {/* <p>{trade.title}</p> */}
    </>
  );
}

export default TradeDetail;
