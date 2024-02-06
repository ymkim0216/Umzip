import Header from "../../components/Header";
import PointDetails from "../../components/MainPage/Myprofile/PointDetails/PointDetails"
import PointPagination from "../../components/MainPage/Myprofile/PointDetails/PointPagination";
import BackButton from "../../components/PublicUse/BackButton";


export default function PointHistory() {

  return (
  <>
    <Header />
    <BackButton />
    <PointDetails/>
    <PointPagination />
  </>
  );
}
