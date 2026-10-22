import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const hanldeSendRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + "/request/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img className="aspect-5/4 w-full" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <label className="inline">
          {age} {gender}
        </label>
        <p className="h-10 overflow-y-scroll scrollbar-none">{about}</p>
        <div className="card-actions justify-center gap-4 my-4">
          <button
            className="btn btn-primary"
            onClick={() => hanldeSendRequest("ignored", _id)}
          >
            ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => hanldeSendRequest("interested", _id)}
          >
            send request
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
