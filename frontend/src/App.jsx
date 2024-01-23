import { useState } from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/MainPage/Hompage'
import DashBoard from './pages/MainPage/DashBoard'
import Help from './pages/Help/Help'
import Login from './pages/Login_SignIn/Login'
import MyProfile from './pages/MainPage/MyProfile'
import Payment from './pages/Service/Payment'
import Recommend from './pages/Service/Recommend'
import RequestClining from './pages/Service/Clining/RequestClining'
import RequestCliningForm from './pages/Service/Clining/RequestCliningForm'
import SubmitCliningEstimate from './pages/Service/Clining/SubmitCliningEstimate'
import RequestDelivery from './pages/Service/Delivery/RequestDelivery'
import RequestDeliveryForm from './pages/Service/Delivery/RequestDeliveryForm'
import SubmitDeliveryEstimate from './pages/Service/Delivery/SubmitDeliveryEstimate'
import SignIn from './pages/Login_SignIn/SignIn'
import Trade from './pages/Trade/Trade'
import Alarm from './pages/MainPage/Alarm'
import TradeDetail from './pages/Trade/TradeDetail'
import TradeWriting from './pages/Trade/TradeWriting'
import HelpDetail from './pages/Help/HelpDetail'
import HelpWriting from './pages/Help/HelpWriting'

const router =createBrowserRouter([
  {path:"/",element:<HomePage/>},
  
  // 회원가입
  {path:"signin" ,element:<SignIn/>},
  //로그인
  {path:"login" ,element:<Login/>},
  //프로필보기
  {path:"myprofile" ,element:<MyProfile/>},
  // 대시보드 
  {path:"dashboard" ,element:<DashBoard/>},

  //청소요청 
  {path:"requestclining" ,element:<RequestClining/>}, // 날짜,차량,시간,위치,짐종류 같은거 제출
  {path:"requestcliningform" ,element:<RequestCliningForm/>},// 계산기 통해서 예산 견적
  {path:"submitcliningestimate" ,element:<SubmitCliningEstimate/>}, //  업체입장에서 다시 제안 아마 페이지가 아니라 컴포넌트
  //용달
  {path:"requestdelivery" ,element:<RequestDelivery/>},  // 날짜,차량,시간,위치,짐종류 같은거 제출
  {path:"requestdeliveryform" ,element:<RequestDeliveryForm/>},// 계산기 통해서 예산 견적
  {path:"submideliveryestimate" ,element:<SubmitDeliveryEstimate/>},//  업체입장에서 다시 제안 아마 페이지가 아니라 컴포넌트
  
  {path:"payment" ,element:<Payment/>}, // 결제
  {path:"recommend" ,element:<Recommend/>}, //용달,청소 추천

  
  {path:"alarm" ,element:<Alarm/>}, //모든 알람 볼수 있는 페이지

  // 중고
  { path: "trade", element: <Trade />,},  //글목록
  { path: "tradedetail", element: <TradeDetail />  }, // 글 상세보기
  { path: "tradewriting", element: <TradeWriting/> }, // 글쓰기
  
  //도움
  {path:"help" ,element:<Help/>}, // 글목록
  { path: "helpdetail", element: <HelpDetail /> },//글상세보기
  { path: "helpwriting", element: <HelpWriting/> }, //글쓰기
])

function App() {

  return (
    <>
  <RouterProvider router={router}/>
    </>
  )
}

export default App
