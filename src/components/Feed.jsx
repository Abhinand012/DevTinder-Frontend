import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchFeed();
  }, []);
  if (!feed || feed.length === 0) {
    return (
      <div className="text-center text-2xl text-gray-300">
        nothing to show on feed
      </div>
    );
  }
  return (
    feed && (
      <div className="flex justify-center items-center">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
