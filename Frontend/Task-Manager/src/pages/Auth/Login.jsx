import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    //login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email.trim(),
        password: password.trim(),
      });
      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        //Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className=" w-full flex justify-center flex-col items-center">
        <div className="bg-color shadow-md  w-full sm:w-max mt-5 flex flex-col items-center rounded-xl">
          <div className="flex justify-center flex-col items-center gap-2 pb-5 p-2 border-b border-zinc-700 w-full">
            <h3 className="description-font-size  text-center font-semibold ">
              {" "}
              Welcome Back
            </h3>
            <p className="metadata-font-size text-color-light">
              Please enter your details to log in
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className="flex justify-center flex-col items-center  px-5 rounded-[12px]   py-5 sm:py-10"
          >
            <div className=" md:grid md:grid-cols-2 flex flex-col gap-5">
              <Input
                type="text"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="John@example.com"
              />
              <Input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Character"
              />
            </div>
            <div className="w-full">
              {error && <p className="text-red-500 mt-3 text-left">{error}</p>}
            </div>
            <div className="flex justify-center my-6">
              <button className="bg-primary w-max py-2 px-4 metadata-font-size dark:text-[#333] font-bold rounded-md hover:opacity-90 ">
                LOGIN
              </button>
            </div>
            <p className="metadata-font-size flex gap-1">
              Don't Have an Account?
              <Link
                to={"/signup"}
                className="text-blue-700 underline cursor-pointer"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
