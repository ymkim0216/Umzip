import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import TradesList from '../../components/Trade/TradesList';
import SearchBar from '../../components/Trade/SearchBar';
import Header from '../../components/Header';
import Chat from '../../components/Chat/Chat';
import classes from './Trade.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function Trade() {
  const trades = [
    {
      id: 1,
      title: '아이폰 11 128GB',
      price: 380000,
      isDirectTranscation: true,
      place: '대구 북구 침산2동',
      content:
        '모서리에 약간 찍힌 자국이 있습니다. 액정은 한번 갈아서 필름 벗기시면 깨끗합니다.뒷면에 카메라로는 안보이는 약간의 기스가 하나 있는데, 눈으로도 잘 안보입니다.',
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/d8db48f4a4ea62113de6d9866f3091debd2f1bfef09bddffc2de74afea630f0e_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 2,
      title: 'LG 그램',
      price: 300000,
      isDirectTranscation: false,
      place: '경기도 화성시 남양읍',
      content: `사용감있고
        수리하셔야될거같습니다
        어답타 선 없습니다
        개당30.000
        총 5대있습니다`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/0ef6bc0c7d0f868333d4ae80fe4e4adce3543c3bb059faf6ec57ada1e0d003e3_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 3,
      title: '화이트옷장 장농 2자',
      price: 50000,
      isDirectTranscation: false,
      place: '부산시 강서구 명지동',
      content: `하나는 서랍형 옷장, 하나는 2단 옷장인데 저는 아래엔 이불보관했어요. 아이들옷장으로도 쓰기 좋아요.`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/cf76b7cb45347b80db61927df39b703c12ae0f3b9262a53ff241e8c527fcec26_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 4,
      title: '롯데상품권 20만원 팝니다',
      price: 180000,
      isDirectTranscation: true,
      place: '부산시 강서구 명지동',
      content: `명지2동 오션시티 주민센터 앞 직거래로 합니다^^
      평일 오후6시 이후 오션시티 주민센터 앞에서만 합니다^^`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/a3f73203544d7c743ee332e8ef8ca5798c976f1c3c628782f19535d526fefdd1_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 5,
      title: '아이폰 11 128GB',
      price: 380000,
      isDirectTranscation: true,
      place: '대구 북구 침산2동',
      content:
        '모서리에 약간 찍힌 자국이 있습니다. 액정은 한번 갈아서 필름 벗기시면 깨끗합니다.뒷면에 카메라로는 안보이는 약간의 기스가 하나 있는데, 눈으로도 잘 안보입니다.',
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/d8db48f4a4ea62113de6d9866f3091debd2f1bfef09bddffc2de74afea630f0e_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 6,
      title: 'LG 그램',
      price: 300000,
      isDirectTranscation: false,
      place: '경기도 화성시 남양읍',
      content: `사용감있고
        수리하셔야될거같습니다
        어답타 선 없습니다
        개당30.000
        총 5대있습니다`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/0ef6bc0c7d0f868333d4ae80fe4e4adce3543c3bb059faf6ec57ada1e0d003e3_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 7,
      title: '화이트옷장 장농 2자',
      price: 50000,
      isDirectTranscation: false,
      place: '부산시 강서구 명지동',
      content: `하나는 서랍형 옷장, 하나는 2단 옷장인데 저는 아래엔 이불보관했어요. 아이들옷장으로도 쓰기 좋아요.`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/cf76b7cb45347b80db61927df39b703c12ae0f3b9262a53ff241e8c527fcec26_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 8,
      title: '롯데상품권 20만원 팝니다',
      price: 180000,
      isDirectTranscation: true,
      place: '부산시 강서구 명지동',
      content: `명지2동 오션시티 주민센터 앞 직거래로 합니다^^
      평일 오후6시 이후 오션시티 주민센터 앞에서만 합니다^^`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/a3f73203544d7c743ee332e8ef8ca5798c976f1c3c628782f19535d526fefdd1_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 9,
      title: '아이폰 11 128GB',
      price: 380000,
      isDirectTranscation: true,
      place: '대구 북구 침산2동',
      content:
        '모서리에 약간 찍힌 자국이 있습니다. 액정은 한번 갈아서 필름 벗기시면 깨끗합니다.뒷면에 카메라로는 안보이는 약간의 기스가 하나 있는데, 눈으로도 잘 안보입니다.',
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/d8db48f4a4ea62113de6d9866f3091debd2f1bfef09bddffc2de74afea630f0e_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 10,
      title: 'LG 그램',
      price: 300000,
      isDirectTranscation: false,
      place: '경기도 화성시 남양읍',
      content: `사용감있고
        수리하셔야될거같습니다
        어답타 선 없습니다
        개당30.000
        총 5대있습니다`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/0ef6bc0c7d0f868333d4ae80fe4e4adce3543c3bb059faf6ec57ada1e0d003e3_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 11,
      title: '화이트옷장 장농 2자',
      price: 50000,
      isDirectTranscation: false,
      place: '부산시 강서구 명지동',
      content: `하나는 서랍형 옷장, 하나는 2단 옷장인데 저는 아래엔 이불보관했어요. 아이들옷장으로도 쓰기 좋아요.`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/cf76b7cb45347b80db61927df39b703c12ae0f3b9262a53ff241e8c527fcec26_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 12,
      title: '롯데상품권 20만원 팝니다',
      price: 180000,
      isDirectTranscation: true,
      place: '부산시 강서구 명지동',
      content: `명지2동 오션시티 주민센터 앞 직거래로 합니다^^
      평일 오후6시 이후 오션시티 주민센터 앞에서만 합니다^^`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/a3f73203544d7c743ee332e8ef8ca5798c976f1c3c628782f19535d526fefdd1_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 13,
      title: '아이폰 11 128GB',
      price: 380000,
      isDirectTranscation: true,
      place: '대구 북구 침산2동',
      content:
        '모서리에 약간 찍힌 자국이 있습니다. 액정은 한번 갈아서 필름 벗기시면 깨끗합니다.뒷면에 카메라로는 안보이는 약간의 기스가 하나 있는데, 눈으로도 잘 안보입니다.',
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/d8db48f4a4ea62113de6d9866f3091debd2f1bfef09bddffc2de74afea630f0e_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 14,
      title: 'LG 그램',
      price: 300000,
      isDirectTranscation: false,
      place: '경기도 화성시 남양읍',
      content: `사용감있고
        수리하셔야될거같습니다
        어답타 선 없습니다
        개당30.000
        총 5대있습니다`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/0ef6bc0c7d0f868333d4ae80fe4e4adce3543c3bb059faf6ec57ada1e0d003e3_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 15,
      title: '화이트옷장 장농 2자',
      price: 50000,
      isDirectTranscation: false,
      place: '부산시 강서구 명지동',
      content: `하나는 서랍형 옷장, 하나는 2단 옷장인데 저는 아래엔 이불보관했어요. 아이들옷장으로도 쓰기 좋아요.`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/cf76b7cb45347b80db61927df39b703c12ae0f3b9262a53ff241e8c527fcec26_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 16,
      title: '롯데상품권 20만원 팝니다',
      price: 180000,
      isDirectTranscation: true,
      place: '부산시 강서구 명지동',
      content: `명지2동 오션시티 주민센터 앞 직거래로 합니다^^
      평일 오후6시 이후 오션시티 주민센터 앞에서만 합니다^^`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/a3f73203544d7c743ee332e8ef8ca5798c976f1c3c628782f19535d526fefdd1_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
  ];

  const [filteredTrades, setFilteredTrades] = useState(trades);

  // 한 번에 표시할 게시글의 최대 개수
  const [visibleCount, setVisibleCount] = useState(12);
  // '더보기' 버튼 표시 여부
  const [showLoadMore, setShowLoadMore] = useState(true);

  const navigate = useNavigate();

  function navigateHandler() {
    navigate('/tradewriting');
  }

  const handleSearch = (searchTerm) => {
    const filtered = trades.filter((trade) =>
      trade.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrades(filtered);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevVisibleCount) => prevVisibleCount + 12);
    // 더 이상 표시할 게시글이 없으면 '더보기' 버튼을 숨깁니다.
    if (visibleCount >= filteredTrades.length - 12) {
      setShowLoadMore(false);
    }
  };

  return (
    <>
      <Header />
      <Chat />
      <article style={{ marginTop: '4rem' }}>
        <h1>중고 거래</h1>
        <SearchBar onSearch={handleSearch} />
        {filteredTrades.length > 0 ? (
          <>
            <TradesList trades={filteredTrades.slice(0, visibleCount)} />
            {showLoadMore && filteredTrades.length > visibleCount && (
              <div className={classes.more}>
                <button onClick={handleLoadMore} className={classes.moreBtn}>
                  <FontAwesomeIcon icon={faCirclePlus} style={{paddingRight: '10px'}}/>
                  더보기
                </button>
              </div>
            )}
          </>
        ) : (
          <p>검색결과가 없습니다.</p>
        )}
        <p>
          <button onClick={navigateHandler} className={classes.writing}>
            글 쓰기
          </button>
        </p>
      </article>
    </>
  );
}
export default Trade;
