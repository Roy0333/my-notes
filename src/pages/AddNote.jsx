import React from "react";
import { Link } from "react-router-dom";
import Editor from "../components/Editor";

const NoteDetails = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="note-form-group">
          <label>Title</label>
          <input type="text"></input>
        </div>
        <div className="note-form-group md:h-[calc(100vh-330px)] h-[calc(100vh-285px)] overflow-hidden">
          <label>Note</label>
          <Editor />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="font-semibold bg-white text-black border border-black transition duration-300 rounded-md py-2 px-3 flex items-center gap-1.5"
        >
          Return
        </Link>
        <button className="font-semibold bg-black text-white hover:bg-white hover:text-black border border-black transition duration-300 rounded-md py-2 px-3 flex items-center gap-1.5">
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteDetails;
