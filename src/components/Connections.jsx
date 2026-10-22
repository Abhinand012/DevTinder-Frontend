import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res.data.data));
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  const defaultPhoto =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  if (!connections || connections.length == 0) {
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
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">No connections yet</h2>
          <p className="text-sm text-base-content/60">
            Start exploring the feed to connect with other developers.
          </p>
        </div>
      </div>
    );
  }

  return (
    connections && (
      <div className="page-container">
        <div className="mb-8 w-full max-w-3xl text-center">
          <h1 className="page-title">Connections</h1>
          <p className="page-subtitle">
            {connections.length} developer{connections.length !== 1 && "s"}{" "}
            in your network
          </p>
        </div>

        <div className="flex w-full max-w-3xl flex-col gap-4">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;
            return (
              <div
                key={_id}
                className="glass-card flex gap-5 p-5 transition-shadow hover:shadow-2xl sm:gap-6"
              >
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
            );
          })}
        </div>
      </div>
    )
  );
};

export default Connections;
