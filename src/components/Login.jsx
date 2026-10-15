import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("abhinand@gmail.com");
  const [password, setPassword] = useState("Abhinand@012");

  const handleLogin = async () => {
    const res = await axios.post(
      "http://localhost:3000/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    console.log(res);
  };

  return (
    <div className="h-100% flex justify-center items-center">
      <fieldset className="mt-30 fieldset bg-primary glass border-base-300 rounded-box w-xs border p-4">
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

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
