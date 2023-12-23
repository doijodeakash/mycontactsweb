import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = (props) => {
  const { isAuth, loading } = useSelector((state) => state.Login);
  const data = useSelector((state) => state);
  console.log("data", data);

  if (!isAuth && !loading) {
    return <Navigate to={{ pathname: "/login" }} />;
  }
  return props.children;
};

export default AuthGuard;
