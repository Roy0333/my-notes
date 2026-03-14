import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "../components/Editor";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AddNotes = () => {
  const editorRef = useRef();
  const [title, setTitle] = useState("");

  // const saveNote = async () => {
  //   const content = editorRef.current.getContent();

  //   try {
  //     await addDoc(collection(db, "notes"), {
  //       title: title,
  //       content: content,
  //       userId: auth.currentUser.uid,
  //       createdAt: serverTimestamp(),
  //     });

  //     alert("Note saved!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const saveNote = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const content = editorRef.current.getContent();

    await addDoc(collection(db, "users", user.uid, "notes"), {
      title: title,
      content: content,
      createdAt: serverTimestamp(),
    });

    alert("Note saved!");
  };
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="note-form-group">
          <label>Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div className="note-form-group md:h-[calc(100vh-330px)] h-[calc(100vh-285px)] overflow-hidden">
          <label>Note</label>
          <Editor ref={editorRef} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="font-semibold bg-white text-black border border-black transition duration-300 rounded-md py-2 px-3 flex items-center gap-1.5"
        >
          Return
        </Link>
        <button
          onClick={saveNote}
          className="font-semibold bg-black text-white hover:bg-white hover:text-black border border-black transition duration-300 rounded-md py-2 px-3 flex items-center gap-1.5"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNotes;
