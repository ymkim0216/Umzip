import { useParams } from 'react-router-dom';

import TradeItemDetail from '../../components/Trade/TradeItemDetail';

function TradeDetail() {
  const trades = [
    {
      id: 1,
      title: '아이폰 11 128GB',
      price: 380000,
      isDirectTranscation: true,
      region: '대구 북구 침산2동',
      date: '2024-01-23',
      content:
        `모서리에 약간 찍힌 자국이 있습니다. 
        액정은 한번 갈아서 필름 벗기시면 깨끗합니다.뒷면에 카메라로는 안보이는 약간의 기스가 하나 있는데, 눈으로도 잘 안보입니다.`,
      image: Array.from(
        { length: 5 },
        (_, index) =>
          `https://dnvefa72aowie.cloudfront.net/origin/article/202401/d8db48f4a4ea62113de6d9866f3091debd2f1bfef09bddffc2de74afea630f0e_${index}.webp?q=95&s=1440x1440&t=inside&f=webp`
      ),
    },
    {
      id: 2,
      title: 'LG 그램',
      price: 300000,
      isDirectTranscation: false,
      region: '경기도 화성시 남양읍',
      date: '2024-01-22',
      content: `사용감있고
        수리하셔야될거같습니다
        어답타 선 없습니다
        개당30.000
        총 5대있습니다`,
      image: Array.from(
        { length: 4 },
        (_, index) =>
          `https://dnvefa72aowie.cloudfront.net/origin/article/202401/0ef6bc0c7d0f868333d4ae80fe4e4adce3543c3bb059faf6ec57ada1e0d003e3_${index}.webp?q=95&s=1440x1440&t=inside&f=webp`
      ),
    },
    {
      id: 3,
      title: '화이트옷장 장농 2자',
      price: 50000,
      isDirectTranscation: false,
      region: '부산시 강서구 명지동',
      date: '2024-01-22',
      content: `하나는 서랍형 옷장, 하나는 2단 옷장인데 저는 아래엔 이불보관했어요. 아이들옷장으로도 쓰기 좋아요.`,
      image: Array.from(
        { length: 5 },
        (_, index) =>
          `https://dnvefa72aowie.cloudfront.net/origin/article/202401/cf76b7cb45347b80db61927df39b703c12ae0f3b9262a53ff241e8c527fcec26_${index}.webp?q=95&s=1440x1440&t=inside&f=webp`
      ),
    },
    {
      id: 4,
      title: '롯데상품권 20만원 팝니다',
      price: 180000,
      isDirectTranscation: true,
      region: '부산시 강서구 명지동',
      date: '2024-01-21',
      content: `명지2동 오션시티 주민센터 앞 직거래로 합니다^^
      평일 오후6시 이후 오션시티 주민센터 앞에서만 합니다^^`,
      image: Array.from(
        { length: 1 },
        (_, index) =>
          `https://dnvefa72aowie.cloudfront.net/origin/article/202401/a3f73203544d7c743ee332e8ef8ca5798c976f1c3c628782f19535d526fefdd1_${index}.webp?q=95&s=1440x1440&t=inside&f=webp`
      ),
    },
    {
      id: 5,
      title: '아이폰 11 128GB',
      price: 380000,
      isDirectTranscation: true,
      region: '대구 북구 침산2동',
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
      region: '경기도 화성시 남양읍',
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
      region: '부산시 강서구 명지동',
      content: `하나는 서랍형 옷장, 하나는 2단 옷장인데 저는 아래엔 이불보관했어요. 아이들옷장으로도 쓰기 좋아요.`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/cf76b7cb45347b80db61927df39b703c12ae0f3b9262a53ff241e8c527fcec26_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 8,
      title: '롯데상품권 20만원 팝니다',
      price: 180000,
      isDirectTranscation: true,
      region: '부산시 강서구 명지동',
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
      region: '대구 북구 침산2동',
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
      region: '경기도 화성시 남양읍',
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
      region: '부산시 강서구 명지동',
      content: `하나는 서랍형 옷장, 하나는 2단 옷장인데 저는 아래엔 이불보관했어요. 아이들옷장으로도 쓰기 좋아요.`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/cf76b7cb45347b80db61927df39b703c12ae0f3b9262a53ff241e8c527fcec26_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 12,
      title: '롯데상품권 20만원 팝니다',
      price: 180000,
      isDirectTranscation: true,
      region: '부산시 강서구 명지동',
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
      region: '대구 북구 침산2동',
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
      region: '경기도 화성시 남양읍',
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
      region: '부산시 강서구 명지동',
      content: `하나는 서랍형 옷장, 하나는 2단 옷장인데 저는 아래엔 이불보관했어요. 아이들옷장으로도 쓰기 좋아요.`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/cf76b7cb45347b80db61927df39b703c12ae0f3b9262a53ff241e8c527fcec26_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
    {
      id: 16,
      title: '롯데상품권 20만원 팝니다',
      price: 180000,
      isDirectTranscation: true,
      region: '부산시 강서구 명지동',
      content: `명지2동 오션시티 주민센터 앞 직거래로 합니다^^
      평일 오후6시 이후 오션시티 주민센터 앞에서만 합니다^^`,
      image:
        'https://dnvefa72aowie.cloudfront.net/origin/article/202401/a3f73203544d7c743ee332e8ef8ca5798c976f1c3c628782f19535d526fefdd1_0.webp?q=95&s=1440x1440&t=inside&f=webp',
    },
  ];

  const { tradeId } = useParams();
  const trade = trades.find((t) => t.id === parseInt(tradeId));

  return <>{trade && <TradeItemDetail trade={trade} />}</>;
}

export default TradeDetail;
