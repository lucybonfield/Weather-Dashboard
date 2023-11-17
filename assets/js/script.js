const startTime = 9;
const endTime = 17;

// Load tasks from local storage
function loadTasks() {
  for (let hour = startTime; hour <= endTime; hour++) {
    const task = localStorage.getItem(`task${hour}`);
    if (task) {
      $(`#task${hour}`).val(task);
    }
  }
}

// Save task to local storage
function saveTask(hour) {
  const taskInput = $(`#task${hour}`).val();
  localStorage.setItem(`task${hour}`, taskInput);
}

// Load tasks when the page is ready
$(document).ready(function () {
  loadTasks();
});

// Generates time blocks
for (let hour = startTime; hour <= endTime; hour++) {
  const currentHour = dayjs().hour();
  const originalTime = dayjs().hour(hour).minute(0).second(0);
  const formattedTime = originalTime.format("hA");
  // Determine the background color based on the current time
  let bgColorClass;
  if (currentHour > hour) {
    bgColorClass = 'past'; // Time has passed
  } else if (currentHour === hour) {
    bgColorClass = 'present'; // Current hour
  } else {
    bgColorClass = 'future'; // Future time
  }

  // Create new rows with incrementing times
  const newRow = `<tr>
                    <td class="time-block hour">${formattedTime}</td>
                    <td class="time-block task"><input type="text" id="task${hour}" /></td>
                    <td class="time-block saveBtn"><button onclick="saveTask(${hour})">Save</button></td>
                 </tr>`;
  const $newRow = $(newRow); // Convert the string to a jQuery object
  $newRow.find('.hour, .task input, .saveBtn').addClass(bgColorClass); // Add the specified class to elements
  $(".container table").append($newRow);
}