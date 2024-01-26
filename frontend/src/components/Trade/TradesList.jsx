import { Link } from 'react-router-dom';

import classes from './TradesList.module.css';

function TradesList({ trades }) {
  return (
    <div className={classes.trades}>
      <h1>중고</h1>
      <ul className={classes.list}>
        {trades.map((trade) => (
          <li key={trade.id} className={classes.item}>
            <Link to={`/trade/${trade.id}`} trade={trade}>
              <img src={trade.image} alt={trade.title} />
              <div className={classes.content}>
                <h2>{trade.title}</h2>
                <address>{trade.region}</address>
                <p>{trade.price}원</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TradesList;
