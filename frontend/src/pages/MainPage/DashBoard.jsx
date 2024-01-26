import { AnimatePresence } from "framer-motion";
import Chat from "../../components/Chat/Chat";
import Header from "../../components/Header";

import MainComponent from "../../components/MainPage/Maincomponent";

export default function DashBoard() {
    return (<>
    <Header/>
    <Chat/>
    <AnimatePresence>
    <MainComponent/>
    </AnimatePresence>
    </>)
}