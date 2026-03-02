import React from "react";

const TopBar = () => {
  return (
    <header className="bg-black flex justify-between items-center">
      <Link to="/">
        <img src="/images/commons/site-logo.png" alt="site logo" />
      </Link>
      <div>
        <button></button>
        <div>
          <ul>
            <li>Profile</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
