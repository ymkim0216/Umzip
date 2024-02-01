import { useSelector, useDispatch } from "react-redux"
import { AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

import HelpList from '../../components/Help/HelpList';
import Header from "../../components/Header";
import Chat from "../../components/Chat/Chat";
import HelpPagination from "../../components/Help/HelpPagination";




function Help() {
  const navigate = useNavigate();
  function navigateHandler() {
    navigate('/helpwriting');
  }

        return (
        <>
          <Header/>
          <Chat/>
          <h1>도움 게시판</h1>
          <HelpList />
          <HelpPagination />
          <button onClick={navigateHandler}>글쓰기</button>
        </>
        );
}
export default Help;