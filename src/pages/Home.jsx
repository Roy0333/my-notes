import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { EllipsisVertical, Pencil, Trash, Eye } from "lucide-react";
import ConfirmationModal from "../components/ConfirmationModal";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [detailDropdown, setDetailDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const isOpenDropDown = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    // setDetailDropdown(!detailDropdown);
    setDetailDropdown((prev) => (prev === id ? null : id));
  };

  // ================
  // Fetch Notes Data
  // =================
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

  // ===========
  // Date Format
  // ============
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

  // ===========
  // Delete Note
  // =============
  // const handleDelete = async (e, id) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   const user = auth.currentUser;
  //   if (!user) return;

  //   try {
  //     await deleteDoc(doc(db, "users", user.uid, "notes", id));

  //     // update UI instantly
  //     setNotes((prev) => prev.filter((note) => note.id !== id));

  //     // optional: close dropdown
  //     setDetailDropdown(null);
  //   } catch (err) {
  //     console.error("Error deleting note:", err);
  //   }
  // };
  const confirmDelete = async () => {
    const user = auth.currentUser;
    if (!user || !selectedNoteId) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "notes", selectedNoteId));

      setNotes((prev) => prev.filter((note) => note.id !== selectedNoteId));

      setShowModal(false);
      setSelectedNoteId(null);
      setDetailDropdown(null);
    } catch (err) {
      console.error(err);
    }
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
            className="shadow-lg px-4 py-4 rounded-lg w-full bg-gray-300 [&:not(:last-child)]:mb-4 flex justify-between items-center gap-3"
          >
            <div>
              <h2 className="text-xl font-medium mb-2">{note.title}</h2>
              <span className="text-sm">
                Last Updated: {formatDate(note.createdAt)}
              </span>
            </div>
            <div className="relative">
              <EllipsisVertical
                className=""
                onClick={(e) => isOpenDropDown(e, note.id)}
              />
              {detailDropdown === note.id && (
                <div className="bg-white shadow-lg absolute top-full left-0 -translate-x-1/2 rounded-md z-10">
                  <button className="px-3 py-2 border-b border-solid border-gray-200 w-full text-left flex gap-2 items-center">
                    <Pencil className="w-5 h-5" /> Edit
                  </button>
                  <button
                    // onClick={(e) => handleDelete(e, note.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedNoteId(note.id);
                      setShowModal(true);
                    }}
                    className="px-3 py-2 border-b border-solid border-gray-200 w-full text-left flex gap-2 items-center"
                  >
                    <Trash className="w-5 h-5" /> Delete
                  </button>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        title="Delete this note?"
        message="This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
};

export default Home;
