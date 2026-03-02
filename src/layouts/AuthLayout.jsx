import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="w-lvw h-lvh overflow-hidden bg-black relative flex justify-center items-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 object-contain w-full h-full brightness-100 grayscale"
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
