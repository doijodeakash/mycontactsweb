import { Link, useLocation } from "react-router-dom";
import { Button } from "reactstrap";

const Nav = () => {
  const user = localStorage.getItem("user");
  const { pathname, state } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload(true);
  };

  return (
    <>
      {user && (
        <nav className="nav nav-pills flex-column flex-sm-row mt-4">
          <Link
            to={"/dashboard"}
            className={`flex-sm-fill text-sm-center nav-link active`}
          >
            Dashboard
          </Link>
          <Link
            to={"/contacts"}
            className={`flex-sm-fill text-sm-center nav-link active`}
            title="My Contacts"
          >
            My Contacts
          </Link>
          <Link
            to={"/product"}
            className={`flex-sm-fill text-sm-center nav-link active`}
            title="products"
          >
            Product
          </Link>
          <Link
            to={"/posts"}
            className={`flex-sm-fill text-sm-center nav-link active`}
            title="My Contacts"
          >
            Posts
          </Link>
          <Link
            to={"/dragndrop"}
            className={`flex-sm-fill text-sm-center nav-link active`}
            title="My Contacts"
          >
            Drag N Drop
          </Link>
          <Link
            to={"/cropper"}
            className={`flex-sm-fill text-sm-center nav-link active`}
            title="My Contacts"
          >
            Cropper
          </Link>
          <Link
            to={"/carousel"}
            className={`flex-sm-fill text-sm-center nav-link active`}
            title="Carousel"
          >
            Carousel
          </Link>
          <Link
            to={"/weather"}
            className={`flex-sm-fill text-sm-center nav-link active`}
            title="Carousel"
          >
            Weather
          </Link>
          <Link
            to={"/calculatorApp"}
            className={`flex-sm-fill text-sm-center nav-link active`}
            title="Calculator"
          >
            calculator
          </Link>
          <Button
            // to={"/dashboard"}
            className={`flex-sm-fill text-sm-center nav-link active`}
            title="My Contacts"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </nav>
      )}
    </>
  );
};
export default Nav;
