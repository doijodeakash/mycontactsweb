import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const NonAuthLayout = ({ children }) => {
  const { isAuth, loading } = useSelector((state) => state.Login);
  if (isAuth && !loading) {
    return <Navigate to={{ pathname: "/dashboard" }} />;
  }
  return <>{children}</>;
};

export default NonAuthLayout;
