import { Link } from 'react-router-dom';

import classes from './TradeItem.module.css';

function TradeItem({ trade }) {
  return (
    <Link to={`/trade/${trade.boardId}`}>
      <div className={classes.item}>
        <img src={trade.thumbnailPath} alt={trade.title} />
        <div className={classes.content}>
          <h2>{trade.title}</h2>
          <address>{trade.sigunguName}</address>
          <p className={classes.price}>{trade.price}원</p>
        </div>
      </div>
    </Link>
  );
}

export default TradeItem;
