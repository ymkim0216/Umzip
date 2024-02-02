import { useParams } from "react-router-dom";
import HelpContent from '../../components/Help/HelpContent';
import HelpComments from '../../components/Help/HelpComments';
import Header from "../../components/Header";
import BackButton from "../../components/PublicUse/BackButton";


export default function HelpDetail() {
    console.log('디테일페이지이동')
    // 받아온 아이디 디테일 페이지로 이동
    let { boardId } = useParams();
    boardId = parseInt(boardId);
    console.log(boardId)
    return (
    <>
    <Header />
    <BackButton />
    <HelpContent />
    <div></div>
    {/* <HelpComments/> */}
    </>
    );
}