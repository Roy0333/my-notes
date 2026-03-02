import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div>
      <div className="mb-5 text-center">
        <img src="/images/commons/site-logo.png" className="mx-auto h-20"></img>
        <h1 className="text-black-400 font-inter text-sm">
          Hey There! Login to Proceed
        </h1>
      </div>
      <form>
        <div className="form-group">
          <label className="block">Username</label>
          <input type="text" placeholder="Enter Username" />
        </div>
        <div className="form-group ">
          <label className="block">Password</label>
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
        <button className="bg-black text-white uppercase text-lg font-semibold tracking-widest w-full rounded-md px-4 py-3">
          login
        </button>
        <div className="py-5 relative text-center">Don't have a account?</div>
        <Link
          to="/signup"
          className="bg-white text-black border border-solid border-black uppercase text-lg font-semibold tracking-widest w-full rounded-md px-4 py-3 inline-block text-center"
        >
          SignUp
        </Link>
      </form>
    </div>
  );
};

export default Login;
