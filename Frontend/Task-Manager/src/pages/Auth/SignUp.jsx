import React, { useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInvitedToken, setAdminInvitedToken] = useState("");

  const [error, setError] = useState(null);

  //handle login form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter a your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    //signup API call
  };

  return (
    <AuthLayout>
      <div className=" w-full flex justify-center flex-col items-center">
        <div className="bg-color shadow-md  w-full sm:w-max mt-5 flex flex-col items-center rounded-xl">
          <div className="flex justify-center flex-col items-center gap-2 pb-5 p-2 border-b border-zinc-700 w-full">
            <p className="description-font-size  text-center font-semibold ">
              Create an Account
            </p>
            <p className="metadata-font-size text-color-light">
              join us today by entering your details below
            </p>
          </div>
          <form
            onSubmit={handleSignUp}
            className=" flex justify-center flex-col items-center  px-5 rounded-[12px]   py-5 sm:py-10"
          >
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            <div className=" md:grid md:grid-cols-2 flex flex-col gap-5">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
              />
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
              <Input
                type="text"
                value={adminInvitedToken}
                onChange={({ target }) => setAdminInvitedToken(target.value)}
                label="Admin Invite  Token"
                placeholder="6 Digit Code"
              />
            </div>{" "}
            <div className="w-full">

            {error && <p className="text-red-500 mt-3 text-left">{error}</p>}
            </div>
            <div className="flex justify-center my-6">
              <button className="bg-primary w-max py-2 px-4 metadata-font-size dark:text-[#333] font-bold rounded-md hover:opacity-90 flex  ">
                SIGN UP
              </button>
            </div>
            <p className="metadata-font-size flex gap-1">
              Already have an Account?
              <Link
                to={"/login"}
                className="text-blue-700 underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
