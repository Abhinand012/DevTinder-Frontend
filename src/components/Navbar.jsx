import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const photoUrl = user?.photoUrl;

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 border-b border-base-content/10 bg-base-100/80 px-4 backdrop-blur-lg sm:px-6">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost gap-2 px-2 text-xl font-bold tracking-tight"
        >
          <span className="text-primary">&lt;/&gt;</span>
          DevTinder
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {user && (
          <>
            <p className="hidden text-sm text-base-content/70 sm:block">
              Welcome,{" "}
              <span className="font-medium text-primary">{user?.firstName}</span>
            </p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={`${user?.firstName}'s profile`}
                    src={
                      photoUrl
                        ? photoUrl
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu dropdown-content menu-sm z-50 mt-3 w-52 rounded-box border border-base-content/10 bg-base-200 p-2 shadow-xl"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li className="border-t border-base-content/10 pt-1">
                  <a onClick={handleLogout} className="text-error">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
