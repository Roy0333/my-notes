import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editorRef = useRef();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 Load existing note
  useEffect(() => {
    const fetchNote = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid, "notes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);

        // ⛳ IMPORTANT: set editor content
        setTimeout(() => {
          if (editorRef.current) {
            editorRef.current.setContent(data.content);
          }
        }, 100);
      }

      setLoading(false);
    };

    fetchNote();
  }, [id]);

  // 🔥 Update note
  const updateNote = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const content = editorRef.current.getContent();

    await updateDoc(doc(db, "users", user.uid, "notes", id), {
      title,
      content,
      updatedAt: serverTimestamp(),
    });

    alert("Note updated!");
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
      <div className="note-form-group ">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="note-form-group">
        <label>Note</label>
        <Editor ref={editorRef} />
      </div>
      <div className="flex justify-between items-center mt-5">
        <button
          className="font-semibold bg-white text-black border border-black transition duration-300 rounded-md py-2 px-3 flex items-center gap-1.5"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="text-base font-semibold bg-black text-white hover:bg-white hover:text-black border border-black transition duration-300 rounded-md py-2 md:px-3 px-2.5 flex items-center gap-1.5"
          onClick={updateNote}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditNote;
