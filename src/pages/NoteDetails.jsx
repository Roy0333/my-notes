import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { db, auth } from "../firebase";

import { doc, getDoc } from "firebase/firestore";

const NoteDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [note, setNote] = useState(null);

  const weekdaysMap = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };

  useEffect(() => {
    const fetchNote = async () => {
      const user = auth.currentUser;

      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid, "notes", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNote(docSnap.data());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNote();
  }, [id]);

  if (!note) {
    return <p>Loading...</p>;
  }

  const reminderDate = note.reminderAt?.toDate();

  // Repeat text formatter
  const getRepeatText = () => {
    switch (note.repeatType) {
      case "daily":
        return "Daily";

      case "weekdays":
        return "Monday - Friday";

      case "weekends":
        return "Saturday - Sunday";

      case "custom":
        return note.selectedDays
          ?.map((day) => weekdaysMap[day] || day)
          .join(", ");

      default:
        return "One Time";
    }
  };

  return (
    <div>
      {/* TOP ACTIONS */}
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

      {/* TITLE */}
      <h1 className="text-3xl font-bold mt-6">{note.title}</h1>

      {/* REMINDER CARD */}
      {note.reminderAt && (
        <div className="grid grid-cols-3 bg-gray-50 mt-5">
          <div>
            <label className="text-lg font-bold text-black mb-2">
              Reminder:
            </label>

            {/* Date & Time */}
            <p className="font-semibold text-sm">
              {reminderDate?.toLocaleString("en-IN", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
          </div>

          {/* Repeat Type */}
          <div>
            <span className="text-lg font-bold text-black">Repeat:</span>

            <p className="text-sm font-medium mt-1">{getRepeatText()}</p>
          </div>

          {/* Custom Days */}
          {note.repeatType === "custom" && note.selectedDays?.length > 0 && (
            <div className="flex flex-wrap gap-2 ">
              {note.selectedDays.map((day) => (
                <span
                  key={day}
                  className="px-3 py-1 rounded-full bg-black text-white text-sm"
                >
                  {day}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* NOTE CONTENT */}
      <div className="mt-5">
        <label className="text-lg font-bold text-black mb-2">Content:</label>
        <div
          className="prose max-w-none editor-box mt-2"
          dangerouslySetInnerHTML={{
            __html: note.content,
          }}
        />
      </div>
    </div>
  );
};

export default NoteDetails;
