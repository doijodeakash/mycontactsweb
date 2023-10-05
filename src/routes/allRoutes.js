import { lazy } from "react";
import { Navigate } from "react-router-dom";
import CarouselBanner from "src/common/components/Carousel";
import Cropper from "src/common/components/Cropper";
import DragNDrop from "src/common/components/DragNDrop/Droppables";
import CalculatorApp from "src/pages/Calculator";
import ContactList from "src/pages/Contact/ContactList";
import ContactForm from "src/pages/Contact/Form";
import Dashboard from "src/pages/Dashboard/Dashboard";
import Post from "src/pages/Post/Post";
import ProductsList from "src/pages/Product/list";
import WeatherApp from "src/pages/WeatherApp/Weather";
// import { Navigate } from "react-router-dom";

// Auth
const Login = lazy(() => import("../pages/Login/index"));

//
const userRoutes = [
  //Private Route
  { path: "/dashboard", component: <Dashboard />, id: "2", name: "Home" },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
    id: "3",
  },
  {
    path: "/contacts",
    exact: true,
    component: <ContactList />,
    id: "4",
  },
  {
    path: "/create-contact",
    exact: true,
    component: <ContactForm />,
    id: "4",
  },
  {
    path: "/posts",
    exact: true,
    component: <Post />,
    id: "4",
  },
  {
    path: "/dragndrop",
    exact: true,
    component: <DragNDrop />,
    id: "4",
  },
  {
    path: "/cropper",
    exact: true,
    component: <Cropper />,
    id: "4",
  },
  {
    path: "/carousel",
    exact: true,
    component: <CarouselBanner />,
    id: "4",
  },
  {
    path: "/weather",
    exact: true,
    component: <WeatherApp />,
    id: "4",
  },
  {
    path: "/product",
    exact: true,
    component: <ProductsList />,
    id: "4",
  },
  {
    path: "/calculatorApp",
    exact: true,
    component: <CalculatorApp />,
    id: "4",
  },

  // {
  //   path: "/contact/update/",
  //   component: <Login />,
  //   id: "1",
  //   name: "Contact Update",
  // },

  // {
  //   path: "/contact/delete",
  //   component: <Login />,
  //   id: "2",
  //   name: "Delete Contact",
  // },
  // {
  //   path: "/profile-details",
  //   component: <Login />,
  //   id: "2",
  //   name: "Profile Details",
  // },
  // { path: "/login", component: <Login />, id: "1", name: "Login" },
];

const PublicRoute = [
  { path: "/login", component: <Login />, id: "0", name: "Login" },
  { path: "/", component: <Login />, id: "1", name: "Login" },
];

export { userRoutes, PublicRoute };
