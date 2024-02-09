import HelpMeToPeopleProfile from "../../../components/MainPage/Myprofile/HelpMeToPeople/HelpMeToPeopleProfile";
import HelpPeopleToMeProfile from "../../../components/MainPage/Myprofile/HelpMeToPeople/HelpMeToPeopleProfile";
import RecommendModalComponent from "../../../components/Recommend/RecommendModalComponent";
import RecommendPeople from "../../../components/Recommend/RecommendPeople";
// experience, status, memberId, userChoice, setUserChoice, companyId, name, rating, tag, img 
export default function SubmitCleaningEstimate() {
    return <>
        <RecommendPeople experience="2008-02-08T12:34:56" status="용달" memberId={15} userChoice=""  setUserChoice="" companyId="" name="최재성"  rating={3.8} tag={[]} img="./randomimg.png" />
    </>
}