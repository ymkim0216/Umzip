import { Navigate, Outlet } from "react-router-dom";

const isLogin = localStorage.getItem('token') || sessionStorage.getItem('token');

const PrivateRoute = () => {
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;