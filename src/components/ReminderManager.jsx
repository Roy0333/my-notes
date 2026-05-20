import { useEffect } from "react";

import { startReminderChecker } from "../utils/reminderChecker";

const ReminderManager = () => {
  useEffect(() => {
    // Ask notification permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    startReminderChecker();
  }, []);

  return null;
};

export default ReminderManager;
