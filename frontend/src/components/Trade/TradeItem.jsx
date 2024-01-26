import { Link, } from 'react-router-dom';

import classes from './TradeItem.module.css';

function TradeItem({ trade }) {
  console.log('TradeItem trade:', trade);
  return (
    <>
      <h1>
        {trade.title}
      </h1>
    </>
  );
}

export default TradeItem;
