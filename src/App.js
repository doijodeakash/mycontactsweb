// import logo from "./logo.svg";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { userRoutes, PublicRoute } from "./routes/allRoutes";
// import { useDispatch, useSelector } from "node_modules/react-redux/es/exports";
import AuthGuard from "./routes/middleware/AuthGuard";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { UserDetails } from "./store/actions";
import "./assets/scss/style.scss";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuth, loading } = useSelector((state) => state.Login);
  const user = localStorage.getItem("user");

  useEffect(() => {
    dispatch(UserDetails());
  }, []);

  // useEffect(() => {
  //   dispatch(resetPage());
  // }, [location?.pathname]);

  // function getLayout() {
  //   let layoutCls = VerticalLayout;

  //   switch (props.layout.layoutType) {
  //     default:
  //       layoutCls = VerticalLayout;
  //       break;
  //   }
  //   return layoutCls;
  // }

  // const Layout = getLayout();

  // Show Loading

  if (loading) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex  justify-content-center align-items-center"
      >
        <Spinner color="success" type="grow" />
        {/* Loading... */}
      </div>
    );
  }
  return (
    <Routes>
      {!loading
        ? userRoutes.map((route) => (
            <Route
              path={route.path}
              element={
                <AuthGuard>
                  <Suspense
                    fallback={
                      <div
                        style={{ height: "100vh" }}
                        className="d-flex  justify-content-center align-items-center"
                      >
                        {/* <Spinner color="#698969" /> */}
                      </div>
                    }
                  >
                    {route.component}
                  </Suspense>
                </AuthGuard>
              }
              key={route?.id}
              isAuthProtected
              exact
            />
          ))
        : null}

      {PublicRoute.map((route) => (
        <Route
          path={route.path}
          element={
            <Suspense
              fallback={
                <div
                  style={{ height: "100vh" }}
                  // className="d-flex  justify-content-center align-items-center"
                >
                  <Spinner color="success" type="grow" />
                </div>
              }
            >
              {/* <NonAuthLayout>{route.component}</NonAuthLayout> */}
              {route.component}
            </Suspense>
          }
          key={route?.id}
          isAuthProtected={false}
        />
      ))}
    </Routes>
  );
}

export default App;
