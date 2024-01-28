import HelpList from '../../components/Help/HelpList';
import { useSelector, useDispatch } from "react-redux"

function Help() {
  let helpsDetail = useSelector((state) => {return state.helps})

    const helps = [

    ]
        return (
        <>
            <h1>도움 게시판</h1>
            <HelpList />
        </>
        );
}
export default Help;