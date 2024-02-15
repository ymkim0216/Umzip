import './App.css';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import DashBoard from './pages/MainPage/DashBoard';
import Help from './pages/Help/Help';
import Login from './pages/Login_SignUp/Login';
import MyProfile from './pages/MainPage/MyProfile';
import Payment from './pages/Service/Payment';
import Recommend from './pages/Service/Recommend';
import RequestDelivery from './pages/Service/Delivery/RequestDelivery';
import RequestDeliveryForm from './pages/Service/Delivery/RequestDeliveryForm';
import SubmitDeliveryEstimate from './pages/Service/Delivery/SubmitDeliveryEstimate';
import SignUp from './pages/Login_SignUp/SignUp';
import Trade from './pages/Trade/Trade';
import Alarm from './pages/MainPage/Alarm';
import TradeDetail from './pages/Trade/TradeDetail';
import TradeWriting from './pages/Trade/TradeWriting';
import HelpDetail from './pages/Help/HelpDetail';
import HelpWriting from './pages/Help/HelpWriting';
import RequestCleaning from './pages/Service/Cleaning/RequestCleaning';
import RequestCleaningForm from './pages/Service/Cleaning/RequestCleaningForm';
import SubmitCleaningEstimate from './pages/Service/Cleaning/SubmitCleaningEstimate';
import PoinHistory from './pages/MainPage/PointHistory';
import CompanyDashBord from './pages/CompanyPage/CompanyDashBord';
import Landing from './pages/LandingPage/Landing'

import PrivateRoute from "./store/PrivateRoute";
import { Navigate } from 'react-router-dom';

// isLogin 상태를 확인하는 함수
const isLogin = () => localStorage.getItem('token') || sessionStorage.getItem('token');

// 로그인 상태에 따라 컴포넌트 또는 Navigate 컴포넌트를 반환하는 함수
const privateElement = (Component) => isLogin() ? <Component /> : <Navigate to="/login" replace />;

const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <Landing />
    ),
  },
  {path: 'home', element: <Landing/>},
  // 회원가입
  { path: 'signup', element: <SignUp /> },
  //로그인
  { path: 'login', element: <Login /> },
  //프로필보기
  { path: 'myprofile/:id', element: privateElement(MyProfile) },
  //포인트적립내역
  { path: 'mypoint/:id', element: privateElement(PoinHistory) },
  // 대시보드 유저
  {path: 'dashboard',element: privateElement(DashBoard)},
  // 대시보드 업체
  {path: 'dashbordcompany', element: privateElement(CompanyDashBord)},
  //청소요청
  { path: 'requestcleaning', element: privateElement(RequestCleaning) }, // 날짜,차량,시간,위치,짐종류 같은거 제출
  { path: 'requestcleaning', element: privateElement(RequestCleaningForm)}, // 계산기 통해서 예산 견적
  { path: 'submitcleaningestimate', element: privateElement(SubmitCleaningEstimate)}, //  업체입장에서 다시 제안 아마 페이지가 아니라 컴포넌트
  //용달
  { path: 'requestdelivery', element: privateElement(RequestDelivery) }, // 날짜,차량,시간,위치,짐종류 같은거 제출
  { path: 'requestdeliveryform', element: privateElement(RequestDeliveryForm) }, // 계산기 통해서 예산 견적
  { path: 'submideliveryestimate', element: privateElement(SubmitDeliveryEstimate) }, //  업체입장에서 다시 제안 아마 페이지가 아니라 컴포넌트
  { path: 'payment', element: privateElement(Payment) }, // 결제
  { path: 'recommend', element: privateElement(Recommend) }, //용달,청소 추천
  { path: 'alarm', element: privateElement(Alarm) }, //모든 알람 볼수 있는 페이지
  // 중고
  {
    path: 'trade',
    children: [
      {
        index: true,
        element: privateElement(Trade),
      }, //글목록
      { path: ':tradeId', id: 'trade-detail', element: privateElement(TradeDetail) }, // 글 상세보기
    ],
  },
  { path: 'tradewriting', element: privateElement(TradeWriting) }, // 글쓰기
  // 원래 형식
  //   { path: 'tradewriting', element: <TradeWriting /> }, // 글쓰기

  //도움
  { path: 'help', element: privateElement(Help) }, // 글목록
  { path: 'helpdetail/:boardId', element: privateElement(HelpDetail) }, //글상세보기
  { path: 'helpwriting', element: privateElement(HelpWriting)}, //글쓰기
]);
export const PRIMARY_COLOR = '#4A3AFF';
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
