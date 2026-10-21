import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("mbappe@gmail.com");
  const [password, setPassword] = useState("Mbappe@012");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      {
        const res = await axios.post(
          BASE_URL + "/login",
          {
            email,
            password,
          },
          { withCredentials: true },
        );
        dispatch(addUser(res.data));
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <fieldset className=" fieldset bg-primary glass border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-white font-bold text-xl ml-28">
          Login
        </legend>

        <label className="label text-white">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label text-white">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="text-red-600 bg-gray-800 rounded-lg p-2">{error}</p>
        )}
        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
