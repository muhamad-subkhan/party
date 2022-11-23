/* eslint-disable */ 
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../../context/DataContext";

export const PrivateRoute = ({ element: Component, ...rest }) => {
  const [dataLogin] = useContext(LoginContext);

  const Logins = dataLogin.isLogin ? <Outlet /> : <Navigate to="/" />;
  return Logins;
};
