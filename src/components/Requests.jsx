import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const fetchRequest = async () => {
    if (!requests) {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
    }
  };

  const reviewRequest = async (status, _id) => {
    await axios.post(
      BASE_URL + "/review/" + status + "/" + _id,
      {},
      {
        withCredentials: true,
      },
    );
    dispatch(removeRequest(_id));
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests || requests.length == 0) {
    return (
      <div className="text-center text-xl my-3 text-gray-400">No requests</div>
    );
  }
  return (
    requests && (
      <div className="self-start flex flex-col items-center gap-4 mt-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="flex justify-between items-center gap-6 bg-base-300 p-4 rounded-lg w-3/4 h-40"
            >
              <div className="flex h-full gap-6">
                <div className="h-full aspect-square">
                  <img
                    className="object-cover object-center aspect-square h-full rounded-full border-white border"
                    src={photoUrl}
                  />
                </div>
                <div>
                  <label className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </label>
                  <h3>{age + "," + gender}</h3>
                  <p className="h-20 overflow-y-auto text-sm text-gray-300">
                    {about}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest("accepted", _id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("rejected", _id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Requests;
