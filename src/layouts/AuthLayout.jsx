import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Outlet, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const AuthLayout = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  // while firebase checking auth
  if (user === undefined) return null;

  if (user) {
    return <Navigate to="/" replace />;
  }
  return (
    <main className="w-lvw h-lvh md:p-0 p-2.5 overflow-hidden bg-black relative flex justify-center items-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 md:object-contain object-cover w-full h-full brightness-100 grayscale"
      >
        <source src="/videos/login-bgVideo.mp4" type="video/mp4" />
      </video>
      <div className="bg-white/75 backdrop-blur-[10px] rounded-[16px] px-5 py-5 relative z-[1] max-w-[400px] w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
