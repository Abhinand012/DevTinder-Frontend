import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchRequest = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/requests/received", {
          withCredentials: true,
        });
        dispatch(addRequests(res.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequest();
  }, [dispatch]);

  const defaultPhoto =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  if (isLoading) {
    return (
      <div className="page-container items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!requests || requests.length == 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-base-content/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">No pending requests</h2>
          <p className="text-sm text-base-content/60">
            When someone sends you a request, it will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    requests && (
      <div className="page-container">
        <div className="mb-8 w-full max-w-3xl text-center">
          <h1 className="page-title">Requests</h1>
          <p className="page-subtitle">
            {requests.length} pending request{requests.length !== 1 && "s"}
          </p>
        </div>

        <div className="flex w-full max-w-3xl flex-col gap-4">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;
            return (
              <div
                key={_id}
                className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 gap-5">
                  <div className="shrink-0">
                    <img
                      className="h-20 w-20 rounded-full border-2 border-primary/30 object-cover sm:h-24 sm:w-24"
                      src={photoUrl || defaultPhoto}
                      alt={`${firstName} ${lastName}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {firstName} {lastName}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {age && (
                        <span className="badge badge-sm badge-primary badge-outline">
                          {age} yrs
                        </span>
                      )}
                      {gender && (
                        <span className="badge badge-sm badge-ghost capitalize">
                          {gender}
                        </span>
                      )}
                    </div>
                    <p className="scrollbar-none mt-3 line-clamp-3 text-sm leading-relaxed text-base-content/70">
                      {about}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-3 sm:flex-col">
                  <button
                    className="btn btn-primary btn-sm flex-1 sm:flex-none sm:min-w-28"
                    onClick={() => reviewRequest("accepted", _id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-outline btn-sm flex-1 sm:flex-none sm:min-w-28"
                    onClick={() => reviewRequest("rejected", _id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Requests;
