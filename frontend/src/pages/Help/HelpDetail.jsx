import { useParams } from "react-router-dom";
import HelpContent from '../../components/Help/HelpContent';
import HelpComments from '../../components/Help/HelpComments';
import Header from "../../components/Header";



export default function HelpDetail() {
    console.log('디테일페이지이동')
    // 받아온 아이디 디테일 페이지로 이동
    let { id } = useParams();
    id = parseInt(id);
    console.log(id)
    return (
    <>
    <Header />
    <HelpContent />
    <div></div>
    <HelpComments/>
    </>
    );
}