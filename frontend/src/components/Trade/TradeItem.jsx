import { Link, useSubmit } from 'react-router-dom';

import classes from './TradeItem.module.css';

function TradeItem({ trade }) {
  return (
    <Link to={`/trade/${trade.id}`}>
      <div className={classes.item}>
        <img src={trade.image} alt={trade.title} />
        <div className={classes.content}>
          <h2>{trade.title}</h2>
          <address>{trade.region}</address>
          <p>{trade.price}원</p>
        </div>
      </div>
    </Link>
  );
}

export default TradeItem;
