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

  const defaultPhoto =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  return (
    <div className="card w-full max-w-sm overflow-hidden border border-base-content/10 bg-base-200/80 shadow-2xl backdrop-blur-sm">
      <figure className="relative">
        <img
          className="aspect-[4/5] w-full object-cover"
          src={photoUrl || defaultPhoto}
          alt={`${firstName} ${lastName}`}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base-300/95 via-base-300/60 to-transparent px-5 pb-5 pt-16">
          <h2 className="text-xl font-bold tracking-tight">
            {firstName} {lastName}
          </h2>
          {(age || gender) && (
            <div className="mt-1 flex items-center gap-2">
              {age && (
                <span className="badge badge-sm badge-primary badge-outline">
                  {age} yrs
                </span>
              )}
              {gender && gender !== "default" && (
                <span className="badge badge-sm badge-ghost capitalize">
                  {gender}
                </span>
              )}
            </div>
          )}
        </div>
      </figure>

      <div className="card-body gap-4 p-5">
        <p className="scrollbar-none h-20 overflow-y-auto text-sm leading-relaxed text-base-content/70">
          {about || "No bio provided yet."}
        </p>

        <div className="card-actions justify-center gap-3">
          <button
            className="btn btn-outline btn-sm flex-1"
            onClick={() => hanldeSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary btn-sm flex-1"
            onClick={() => hanldeSendRequest("interested", _id)}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
