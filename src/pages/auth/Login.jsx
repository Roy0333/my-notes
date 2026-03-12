import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      // check email verification
      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        return;
      }

      alert("Login successful!");
      navigate("/");
      // here we usually redirect
      // navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <div className="mb-5 text-center">
        <img src="/images/commons/site-logo.png" className="mx-auto h-20" />
        <h1 className="text-black-400 font-inter text-sm">
          Hey There! Login to Proceed
        </h1>
      </div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
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
          Login
        </button>

        <div className="py-5 text-center">Don't have an account?</div>

        <Link
          to="/signup"
          className="bg-white text-black border border-black uppercase text-lg font-semibold tracking-widest w-full rounded-md px-4 py-3 inline-block text-center"
        >
          SignUp
        </Link>
      </form>
    </div>
  );
};

export default Login;
