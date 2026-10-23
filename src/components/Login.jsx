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
      console.log(err?.response?.data);
      setError(err?.response?.data);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="glass-card w-full max-w-md p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {isLoginForm ? "Welcome back" : "Create account"}
          </h1>
          <p className="mt-1 text-sm text-base-content/60">
            {isLoginForm
              ? "Sign in to find your next dev connection"
              : "Join the developer community"}
          </p>
        </div>

        <fieldset className="fieldset gap-1">
          {!isLoginForm && (
            <>
              <label className="label pt-2">First Name</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="label pt-2">Last Name</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}

          <label className="label pt-2">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label pt-2">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="alert alert-error mt-4 py-2 text-sm">
              <span>{error}</span>
            </div>
          )}

          <button
            className="btn btn-primary mt-6 w-full"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Sign In" : "Create Account"}
          </button>

          <p
            className="mt-4 cursor-pointer text-center text-sm text-base-content/60 transition-colors hover:text-primary"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm
              ? "New user? Sign up now"
              : "Already have an account? Sign in"}
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
