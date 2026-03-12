import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <div className="flex justify-end">
        <Link to="/note" className="bg-black text-white rounded-md py-2 px-3">
          Add New
        </Link>
      </div>
      <Link to="">
        <h2>First Note</h2>
        <span>Last Updated: 10:12PM 12JAN 2026</span>
      </Link>
    </div>
  );
};

export default Home;
