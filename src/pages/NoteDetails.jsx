import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid, "notes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNote(docSnap.data());
      }
    };

    fetchNote();
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <button
          className="font-semibold bg-white text-black border border-black transition duration-300 rounded-md py-2 px-3 flex items-center gap-1.5"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="text-base font-semibold bg-black text-white hover:bg-white hover:text-black border border-black transition duration-300 rounded-md py-2 md:px-3 px-2.5 flex items-center gap-1.5"
          onClick={() => navigate(`/edit-note/${id}`)}
        >
          Edit
        </button>
      </div>

      <h1>{note.title}</h1>
      {/* {note.content} */}
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </div>
  );
};

export default NoteDetails;
