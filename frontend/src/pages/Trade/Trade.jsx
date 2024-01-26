import TradesList from '../../components/Trade/TradesList';

function Trade() {
  const trades = [
    {
      id: 1,
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
      id: 2,
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
  ];

  return (
    <>
      <h1>중고 거래</h1>
      <TradesList trades={trades} />
    </>
  );
}
export default Trade;
