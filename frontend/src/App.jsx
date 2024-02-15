import './App.css';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import useAuthStore from './store/store';
import HomePage from './pages/MainPage/Hompage';
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

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore(); // Access the user state

  if (!user) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  return children; // If authenticated, render the children components
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <ProtectedRoute>
        <DashBoard />
      // </ProtectedRoute>
    ),
  },
  {path: 'home', element: <Landing/>},
  // 회원가입
  { path: 'signup', element: <SignUp /> },
  //로그인
  { path: 'login', element: <Login /> },
  //프로필보기
  { path: 'myprofile/:id', element: <MyProfile /> },
  //포인트적립내역
  { path: 'mypoint/:id', element: <PoinHistory /> },
  // 대시보드 유저
  {
    path: 'dashboard',
    element: (
      // <ProtectedRoute>
        <DashBoard />
      // </ProtectedRoute>
    ),
  },
  // 대시보드 업체
  {
    path: 'dashbordcompany', element: <CompanyDashBord />
  },

  //청소요청
  { path: 'requestcleaning', element: <RequestCleaning /> }, // 날짜,차량,시간,위치,짐종류 같은거 제출
  { path: 'requestcleaning', element: <RequestCleaningForm /> }, // 계산기 통해서 예산 견적
  { path: 'submitcleaningestimate', element: <SubmitCleaningEstimate /> }, //  업체입장에서 다시 제안 아마 페이지가 아니라 컴포넌트
  //용달
  { path: 'requestdelivery', element: <RequestDelivery /> }, // 날짜,차량,시간,위치,짐종류 같은거 제출
  { path: 'requestdeliveryform', element: <RequestDeliveryForm /> }, // 계산기 통해서 예산 견적
  { path: 'submideliveryestimate', element: <SubmitDeliveryEstimate /> }, //  업체입장에서 다시 제안 아마 페이지가 아니라 컴포넌트

  { path: 'payment', element: <Payment /> }, // 결제
  { path: 'recommend', element: <Recommend /> }, //용달,청소 추천

  { path: 'alarm', element: <Alarm /> }, //모든 알람 볼수 있는 페이지

  // 중고
  {
    path: 'trade',
    children: [
      {
        index: true,
        element: <Trade />,
      }, //글목록
      { path: ':tradeId', id: 'trade-detail', element: <TradeDetail /> }, // 글 상세보기
    ],
  },
  { path: 'tradewriting', element: <TradeWriting /> }, // 글쓰기

  //도움
  { path: 'help', element: <Help /> }, // 글목록
  { path: 'helpdetail/:boardId', element: <HelpDetail /> }, //글상세보기
  { path: 'helpwriting', element: <HelpWriting /> }, //글쓰기
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
