import styles from './Styles.module.css';
import Spinner from '../../../public/spinner.gif';

const Loading = () => {
  return (
    <div className={styles.background}>
      <div className={styles.loadingText}>잠시만 기다려 주세요.</div>
      <img src={Spinner} alt="로딩중" width="5%" />
    </div>
  );
};

export default Loading;