import React, { useEffect, useRef, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Editor from "../components/Editor";

import { db, auth } from "../firebase";

import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

const EditNote = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const editorRef = useRef();

  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(true);

  // Reminder datetime
  const [reminderTime, setReminderTime] = useState(dayjs());

  // Repeat settings
  const [repeatType, setRepeatType] = useState("once");

  const [selectedDays, setSelectedDays] = useState([]);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Toggle custom days
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays((prev) => prev.filter((d) => d !== day));
    } else {
      setSelectedDays((prev) => [...prev, day]);
    }
  };

  // LOAD NOTE
  useEffect(() => {
    const fetchNote = async () => {
      const user = auth.currentUser;

      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid, "notes", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setTitle(data.title || "");

          // Reminder time
          if (data.reminderAt) {
            setReminderTime(dayjs(data.reminderAt.toDate()));
          }

          // Repeat settings
          setRepeatType(data.repeatType || "once");

          setSelectedDays(data.selectedDays || []);

          // Editor content
          setTimeout(() => {
            if (editorRef.current) {
              editorRef.current.setContent(data.content || "");
            }
          }, 100);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // UPDATE NOTE
  const updateNote = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const content = editorRef.current.getContent();

    // Validation
    if (!title.trim()) {
      alert("Please enter title");

      return;
    }

    if (!content.trim()) {
      alert("Please enter note");

      return;
    }

    if (repeatType === "custom" && selectedDays.length === 0) {
      alert("Please select at least one day");

      return;
    }

    const finalReminderTime = reminderTime.toDate();

    // One-time reminder validation
    if (repeatType === "once") {
      if (finalReminderTime < new Date()) {
        alert("Please select future date & time");

        return;
      }
    }

    try {
      await updateDoc(doc(db, "users", user.uid, "notes", id), {
        title,

        content,

        reminderAt: finalReminderTime,

        repeatType,

        selectedDays,

        updatedAt: serverTimestamp(),
      });

      alert("Note updated!");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        {/* TITLE */}
        <div className="note-form-group">
          <label>Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* REMINDER */}
        <div className="note-form-group mt-5">
          <label className="block mb-3 font-semibold">Edit Reminder</label>

          <div className="block">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                value={reminderTime}
                onChange={(newValue) => setReminderTime(newValue)}
                ampm={true}
                views={["year", "month", "day", "hours", "minutes"]}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </div>

          {/* Repeat Options */}
          <div className="mt-5">
            <label className="block mb-2 font-medium">Repeat</label>

            <select
              value={repeatType}
              onChange={(e) => setRepeatType(e.target.value)}
              className="border p-2 rounded-md w-full"
            >
              <option value="once">One Time</option>

              <option value="daily">Daily</option>

              <option value="weekdays">Monday - Friday</option>

              <option value="weekends">Saturday - Sunday</option>

              <option value="custom">Custom Days</option>
            </select>
          </div>

          {/* Custom Days */}
          {repeatType === "custom" && (
            <div className="flex gap-2 flex-wrap mt-4">
              {weekdays.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-full border transition ${
                    selectedDays.includes(day)
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NOTE */}
        <div className="note-form-group mt-5">
          <label>Note</label>

          <Editor ref={editorRef} />
        </div>
      </div>

      {/* BUTTONS */}
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
