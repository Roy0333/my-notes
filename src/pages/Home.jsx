import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "users", user.uid, "notes"),
        orderBy("createdAt", "desc"),
      );

      const snapshot = await getDocs(q);

      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotes(notesData);
    };

    fetchNotes();
  }, []);
  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = timestamp.toDate();

    return date.toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
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
        {notes.map((note) => (
          <Link
            key={note.id}
            to={`/note/${note.id}`}
            className="shadow-lg px-4 py-4 rounded-lg w-full block bg-gray-300 [&:not(:last-child)]:mb-4"
          >
            <h2 className="text-xl font-medium mb-2">{note.title}</h2>
            <span className="text-sm">
              Last Updated: {formatDate(note.createdAt)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
