import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Home = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex">
          <h1 className="md:text-3xl text-2xl font-bold">My Notes</h1>
          <span className="font-medium ml-2">0</span>
        </div>
        <Link
          to="/add-note"
          className="text-base font-semibold bg-black text-white hover:bg-white hover:text-black border border-black transition duration-300 rounded-md py-2 md:px-3 px-2.5 flex items-center gap-1.5"
        >
          <Plus className="md:w-auto md:h-auto w-5 h-5" /> Add New
        </Link>
      </div>
      <div className="mt-10">
        <Link
          to=""
          className="shadow-lg px-4 py-4 rounded-lg w-full block bg-gray-300"
        >
          <h2 className="text-xl font-medium mb-2">First Note</h2>
          <span className="text-sm">Last Updated: 10:12PM 12JAN 2026</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
