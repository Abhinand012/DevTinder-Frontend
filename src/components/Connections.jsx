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
  });
  if (!connections || connections.length == 0) {
    return (
      <div className="text-center text-xl my-3 text-gray-400">
        No connections
      </div>
    );
  }
  return (
    connections && (
      <div className="flex flex-col items-center gap-4 mt-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              key={_id}
              className="flex gap-6 bg-base-300 p-4 rounded-lg w-3/4 h-40"
            >
              <div className="h-full aspect-square">
                <img
                  className="object-cover object-center h-full rounded-full border-white border"
                  src={photoUrl}
                />
              </div>
              <div>
                <label className="font-bold text-xl">
                  {firstName + " " + lastName}
                </label>
                <h3>{age + "," + gender}</h3>
                <p className="h-20 overflow-y-auto">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Connections;
