import { Link, useLocation } from "react-router-dom";
import { Button } from "reactstrap";

const Nav = () => {
  const user = localStorage.getItem("user");
  const { pathname, state } = useLocation();
  const getActiveLink = (path) => {
    if (pathname === "/dashboard" || pathname === "/contacts") {
      return "active";
    } else {
      return "active";
    }
  };

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
            className={`flex-sm-fill text-sm-center nav-link ${getActiveLink()}`}
          >
            Dashboard
          </Link>
          {/* <a
        className="flex-sm-fill text-sm-center nav-link active"
        href="/dashboard"
      >
        Dashboard
      </a> */}
          <Link
            to={"/contacts"}
            className={`flex-sm-fill text-sm-center nav-link ${getActiveLink()}`}
            title="My Contacts"
          >
            My Contacts
          </Link>
          {/* <a className={`flex-sm-fill text-sm-center nav-link ${getActiveLink()}`} href="/contacts">
        My Contacts
      </a> */}
          <Link
            to={"/posts"}
            className={`flex-sm-fill text-sm-center nav-link ${getActiveLink()}`}
            title="My Contacts"
          >
            Posts
          </Link>
          <Link
            to={"/dragndrop"}
            className={`flex-sm-fill text-sm-center nav-link ${getActiveLink()}`}
            title="My Contacts"
          >
            Drag N Drop
          </Link>
          <Link
            to={"/cropper"}
            className={`flex-sm-fill text-sm-center nav-link ${getActiveLink()}`}
            title="My Contacts"
          >
            Cropper
          </Link>
          <Link
            to={"/carousel"}
            className={`flex-sm-fill text-sm-center nav-link ${getActiveLink()}`}
            title="Carousel"
          >
            Carousel
          </Link>
          <Link
            to={"/weather"}
            className={`flex-sm-fill text-sm-center nav-link ${getActiveLink()}`}
            title="Carousel"
          >
            Weather
          </Link>
          <Button
            // to={"/dashboard"}
            className={`flex-sm-fill text-sm-center nav-link ${getActiveLink()}`}
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
