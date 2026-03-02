import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmIsPasswordVisible] =
    useState(false);
  return (
    <div>
      <div className="mb-5 text-center">
        <img src="/images/commons/site-logo.png" className="mx-auto h-20"></img>
        <h1 className="text-black-400 font-inter text-sm">
          Hey There! SignUp to Proceed
        </h1>
      </div>
      <form>
        <div className="form-group">
          <label className="block">Set Username</label>
          <input type="text" placeholder="Enter Username" />
        </div>
        <div className="form-group ">
          <label className="block">Set Password</label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter Password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
        <div className="form-group ">
          <label className="block">Confirm Password</label>
          <div className="relative">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Enter Confirm Password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() =>
                setConfirmIsPasswordVisible(!isConfirmPasswordVisible)
              }
            >
              {isConfirmPasswordVisible ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
        <button className="bg-black text-white uppercase text-lg font-semibold tracking-widest w-full rounded-md px-4 py-3">
          SignUp
        </button>
        <div className="py-5 relative text-center">Already have a account?</div>
        <Link
          to="/"
          className="bg-white text-black border border-solid border-black uppercase text-lg font-semibold tracking-widest w-full rounded-md px-4 py-3 inline-block text-center"
        >
          Back to login
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
