import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const hasToken = document.cookie
        .split("; ")
        .some((cookie) => cookie.startsWith("token="));

      if (hasToken) {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res?.data));
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.status == 401) {
        navigate("/login");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
