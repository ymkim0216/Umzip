import CompanyMain from '../../components/CompanyMainPage/CompanyMain';
import Header from "../../components/Header";
import Chat from "../../components/Chat/Chat";




function CompanyDsahBord() {
        return (
        <>
            <Header />
            <h1>업체 대시보드</h1>
            <CompanyMain />
            <Chat />
        </>
        );
}
export default CompanyDsahBord;