import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Editor from "../components/Editor";

import { db, auth } from "../firebase";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

const AddNotes = () => {
  const editorRef = useRef();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  // Alarm time
  const [reminderTime, setReminderTime] = useState(dayjs());
  const [repeatType, setRepeatType] = useState("once");
  const [selectedDays, setSelectedDays] = useState([]);

  const saveNote = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const content = editorRef.current.getContent();

    // Convert to JS Date
    let finalReminderTime = reminderTime.toDate();

    // If selected time already passed today,
    // move reminder to tomorrow
    if (repeatType === "once") {
      if (finalReminderTime < new Date()) {
        alert("Please select future date/time");

        return;
      }
    }
    if (repeatType === "custom" && selectedDays.length === 0) {
      alert("Please select at least one day");

      return;
    }
    if (!title.trim()) {
      alert("Please enter title");

      return;
    }
    if (!content.trim()) {
      alert("Please enter note");

      return;
    }
    try {
      await addDoc(collection(db, "users", user.uid, "notes"), {
        title,

        content,

        reminderAt: finalReminderTime,

        repeatType,

        selectedDays,

        createdAt: serverTimestamp(),
      });

      alert("Reminder note saved!");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays((prev) => prev.filter((d) => d !== day));
    } else {
      setSelectedDays((prev) => [...prev, day]);
    }
  };

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
        {/* <div className="note-form-group mt-5">
          <label className="block mb-3 font-semibold">Set Reminder</label>

          <div className="flex ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                value={reminderTime}
                onChange={(newValue) => setReminderTime(newValue)}
                ampm={true}
                views={["year", "month", "day", "hours", "minutes"]}
              />
            </LocalizationProvider>
          </div>
        </div> */}
        <div className="note-form-group mt-5">
          <label className="block mb-3 font-semibold">Set Reminder</label>

          <div className="block">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* Analog Clock */}
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
        <div className="note-form-group md:h-[calc(100vh-430px)] h-[calc(100vh-380px)] overflow-hidden mt-4">
          <label>Note</label>

          <Editor ref={editorRef} />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between items-center mt-4">
        <Link
          to="/"
          className="font-semibold bg-white text-black border border-black transition duration-300 rounded-md py-2 px-3"
        >
          Return
        </Link>

        <button
          onClick={saveNote}
          className="font-semibold bg-black text-white hover:bg-white hover:text-black border border-black transition duration-300 rounded-md py-2 px-3"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNotes;
