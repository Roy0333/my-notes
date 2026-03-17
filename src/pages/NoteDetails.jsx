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
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{note.title}</h1>
      {/* {note.content} */}
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </div>
  );
};

export default NoteDetails;
