import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config/baseurl";
const Login = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailId || !emailRegex.test(emailId)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const result = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      const userData = result?.data?.data;
      dispatch(addUser(userData));

      setEmailId("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log("Axios Error: ", error);
      setAuthError(error?.response?.data?.msg || "Something went wrong");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      const newUserData = res?.data?.data;
      dispatch(addUser(newUserData));
      setFirstName("");
      setLastName("");
      setEmailId("");
      setPassword("");
      navigate("/profile");
    } catch (error) {
      console.log("Axios Error: " + error);
      console.log("Error Message: " + error?.response?.data?.err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">
            {isNewUser ? "Sign Up" : "Login"}
          </h2>

          <form>
            {isNewUser && (
              <>
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="input input-bordered"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label py-1">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="input input-bordered"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="form-control mt-4">
              <label className="label py-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="input input-bordered"
                required
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}

            {/* Password */}
            <div className="form-control mt-4">
              <label className="label py-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}

            {/* Submit Button */}
            <div className="form-control mt-4">
              {isNewUser ? (
                <button className="btn btn-primary" onClick={handleSignUp}>
                  SignUp
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
              )}
            </div>
            {!isNewUser && (
              <label className="label mt-3">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            )}

            <div className="mt-3">
              {isNewUser ? (
                <p>
                  Existing User?
                  <span
                    className="underline cursor-pointer ml-2"
                    onClick={() => setIsNewUser((prev) => !prev)}
                  >
                    Login Here
                  </span>
                </p>
              ) : (
                <p>
                  New User?
                  <span
                    className="underline cursor-pointer ml-2"
                    onClick={() => setIsNewUser((prev) => !prev)}
                  >
                    SignUp Here
                  </span>
                </p>
              )}
            </div>

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
