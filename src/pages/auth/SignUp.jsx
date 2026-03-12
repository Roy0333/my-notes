import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmIsPasswordVisible] =
    useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await sendEmailVerification(user);

      alert("Account created! Please check your email to verify your account.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="mb-5 text-center">
        <img src="/images/commons/site-logo.png" className="mx-auto h-20" />
        <h1 className="text-black-400 font-inter text-sm">
          Hey There! SignUp to Proceed
        </h1>
      </div>

      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Set Password</label>

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

        <div className="form-group">
          <label>Confirm Password</label>

          <div className="relative">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
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

        <button
          disabled={loading}
          className="bg-black text-white w-full py-3 rounded-md mt-4 uppercase text-lg font-semibold tracking-widest"
        >
          {loading ? "Signing Up..." : "Signup"}
        </button>

        <div className="py-5 text-center">Already have an account?</div>

        <Link
          to="/login"
          className="bg-white text-black border border-black w-full py-3 block text-center rounded-md uppercase text-lg font-semibold tracking-widest"
        >
          Back to login
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
