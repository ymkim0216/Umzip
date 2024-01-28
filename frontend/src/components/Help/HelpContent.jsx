import { useParams } from "react-router-dom";
import classes from './HelpContent.module.css';
import { useSelector, useDispatch } from "react-redux"


function HelpDetail() {
  let helpsDetail = useSelector((state) => state.helps)
  console.log(helpsDetail);
  console.log('디테일페이지이동')
  // 받아온 아이디 디테일 페이지로 이동
  let { id } = useParams();
  id = parseInt(id);
  let helpDetail = helpsDetail.find(function (x) {
    return x.id === id;
  });
  return (
    <div className={classes.helps}>
      {helpDetail.category === 1 && <span>도와주세요</span> }
      {helpDetail.category === 2 && <span>도와줄게요</span> }
      {helpDetail.category === 3 && <span>도와줬어요</span> }
      <span>{helpDetail.title}</span>
      <span>{helpDetail.point}</span>
      <div></div>
      <span>{helpDetail.userName}</span>
      <span>{helpDetail.date}</span>
      <div>{helpDetail.content}</div>
      <div></div>
      <span>{helpDetail.view}</span>
      <span>{helpDetail.comment}</span>
    </div>
  );
}

export default HelpDetail;
