import { collection, getDocs } from "firebase/firestore";

import { db, auth } from "../firebase";

let triggeredReminders = new Set();

let unlockedAudio = null;

let audioUnlocked = false;

// Unlock browser audio
const unlockAudio = () => {
  if (audioUnlocked) return;

  unlockedAudio = new Audio("/alarm.mp3");

  unlockedAudio.volume = 1;

  unlockedAudio.play().then(() => {
    unlockedAudio.pause();

    unlockedAudio.currentTime = 0;

    audioUnlocked = true;

    console.log("Audio unlocked");
  });

  document.removeEventListener("click", unlockAudio);
};

// Wait for first user interaction
document.addEventListener("click", unlockAudio);

export const startReminderChecker = () => {
  setInterval(async () => {
    const user = auth.currentUser;

    if (!user) return;

    const snapshot = await getDocs(collection(db, "users", user.uid, "notes"));

    const now = new Date();

    snapshot.forEach((docSnap) => {
      const note = docSnap.data();

      if (!note.reminderAt) return;

      const reminderDate = note.reminderAt.toDate();

      const diff = reminderDate.getTime() - now.getTime();

      // Trigger within 30 sec
      if (diff <= 30000 && diff >= 0 && !triggeredReminders.has(docSnap.id)) {
        triggeredReminders.add(docSnap.id);

        triggerAlarm(note.title);
      }
    });
  }, 5000);
};

const triggerAlarm = async (title) => {
  // Notification
  if (Notification.permission === "granted") {
    new Notification("⏰ Reminder", {
      body: title,
    });
  }

  // Remove old popup
  const existing = document.getElementById("alarm-popup");

  if (existing) {
    existing.remove();
  }

  // Popup
  const popup = document.createElement("div");

  popup.id = "alarm-popup";

  popup.style.position = "fixed";

  popup.style.top = "20px";

  popup.style.right = "20px";

  popup.style.zIndex = "999999";

  popup.style.width = "320px";

  popup.style.background = "white";

  popup.style.border = "2px solid black";

  popup.style.borderRadius = "20px";

  popup.style.padding = "20px";

  popup.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";

  popup.innerHTML = `
      <h2 style="
        margin:0;
        margin-bottom:10px;
        font-size:24px;
        font-family:sans-serif;
      ">
        ⏰ Reminder
      </h2>

      <p style="
        margin-bottom:20px;
        font-size:16px;
        font-family:sans-serif;
      ">
        ${title}
      </p>

      <button id="dismiss-btn"
        style="
          width:100%;
          background:black;
          color:white;
          border:none;
          padding:12px;
          border-radius:12px;
          cursor:pointer;
          font-size:16px;
          font-weight:bold;
        "
      >
        Dismiss
      </button>
    `;

  document.body.appendChild(popup);

  // Alarm loop
  let stopped = false;

  const playLoop = async () => {
    if (stopped) return;

    const audio = new Audio("/alarm.mp3");

    audio.volume = 1;

    try {
      await audio.play();

      audio.onended = () => {
        if (!stopped) {
          playLoop();
        }
      };
    } catch (err) {
      console.error("Playback blocked:", err);
    }
  };

  playLoop();

  // Dismiss
  const dismissBtn = document.getElementById("dismiss-btn");

  dismissBtn.onclick = () => {
    stopped = true;

    popup.remove();
  };

  // Auto stop after 2 mins
  setTimeout(
    () => {
      stopped = true;

      popup.remove();
    },
    2 * 60 * 1000,
  );
};
