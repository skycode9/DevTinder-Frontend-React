import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config/baseurl";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      const userData = result?.data?.data;
      console.log(userData);
      dispatch(addUser(userData));
      navigate("/");
    } catch (error) {
      console.log(error);
      setAuthError(error?.response?.data?.msg || "Something went wrong");
    }
  };
  return (
    <div className="h-[calc(100vh-8rem)] bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>

          <form>
            {/* Email */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="input"
                required
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-control mt-4">
              <label className="label py-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
            <label className="label mt-3">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
            {authError && (
              <p className="text-red-500 shadow-2xl">{authError}</p>
            )}
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Login (example) */}
          <button className="btn btn-outline w-full">
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
