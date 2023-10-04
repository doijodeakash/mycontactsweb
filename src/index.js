import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import "react-image-crop/dist/ReactCrop.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/index";
import Nav from "./components/Nav";
// import { Provider } from "node_modules/react-redux/es/exports";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer
        type="error"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
      <Nav />
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
);

// serviceWorker.unregister();
