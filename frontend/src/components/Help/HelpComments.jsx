import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { selectFilteredHelps  } from '../../store/helpRedux'  // 리덕스에서 불러온 데이터
import { useSelector, useDispatch } from "react-redux"
import useStore from '../../store/helpData';



// "comment: [  {
//   "writerID": long,
//   "writerName": String,
//   "writerRole": String,
//   "comment": String,
//   "creationDate": String,
// }  ]

function HelpComments() {
  // axios test
  const data = useStore(state => state.data);
  const loading = useStore(state => state.loading);
  const error = useStore(state => state.error);
  const fetchData = useStore(state => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data)
  // axios


  let helpsDetail = useSelector(selectFilteredHelps)  // 데이터 변수에넣고
  let { id } = useParams();
  id = parseInt(id); // id고유번호 받아와서

  let helpDetail = helpsDetail.find(function (x) {  // 받은 id를 찾기
    return x.id === id;
  });
  return (
    <>
      <h4>map함수 돌리기 댓글</h4>
    </>
  );
}

export default HelpComments;
