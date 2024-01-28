import { useSelector, useDispatch } from "react-redux"
import { AnimatePresence } from "framer-motion";

import HelpList from '../../components/Help/HelpList';
import Header from "../../components/Header";
import Chat from "../../components/Chat/Chat";




function Help() {
  let helpsDetail = useSelector((state) => {return state.helps})

    const helps = [

    ]
        return (
        <>
          <Header/>
          <Chat/>
          <h1>도움 게시판</h1>
          <HelpList />
        </>
        );
}
export default Help;