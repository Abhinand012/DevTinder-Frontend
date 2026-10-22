import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);
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

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <fieldset className=" fieldset bg-primary glass border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-white font-bold text-xl ml-28">
          {isLoginForm ? "Login" : "Sign Up"}
        </legend>
        {!isLoginForm && (
          <>
            <label className="label text-white">First Name</label>
            <input
              type="email"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label text-white">Last Name</label>
            <input
              type="email"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

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
        <button
          className="btn btn-neutral mt-4"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
          className="text-center mt-3 cursor-pointer hover:text-gray-200"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm ? "New User? sign up now" : "Already user? Login now"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
