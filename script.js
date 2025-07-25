// Ask for notification permission
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Add task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const timeInput = document.getElementById("timeInput");
  const taskText = taskInput.value.trim();
  const taskTime = timeInput.value;

  if (taskText === "" || taskTime === "") return;

  const taskItem = document.createElement("li");
  taskItem.textContent = `${taskText} — ${taskTime}`;
  document.getElementById("taskList").appendChild(taskItem);

  // Set alarm
  const now = new Date();
  const [hours, minutes] = taskTime.split(":");
  const alarmTime = new Date();
  alarmTime.setHours(hours, minutes, 0, 0);
  const timeDiff = alarmTime - now;

  if (timeDiff > 0) {
    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("⏰ Task Reminder", {
          body: `${taskText} is scheduled for now.`,
        });
      } else {
        alert(`⏰ Reminder: ${taskText}`);
      }
    }, timeDiff);
  }

  taskInput.value = "";
  timeInput.value = "";
}

// Add task on Enter key
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
