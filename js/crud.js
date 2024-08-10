// const apiString = "http://127.0.0.1:8008/api/v1/tasks/";
const apiString = "https://iconcodes-rest.onrender.com/api/v1/tasks/";
const apiKey = "6686d2304e5f0b50d31c366a";

const taskInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-task");
const taskContainer = document.querySelector("#task-container");

const taskCountSpan = document.querySelector("#task-count");
const taskcompletedCountSpan = document.querySelector("#task-completed-count");

const deleteButtons = document.querySelectorAll(".delete");

const taskTemplate = `
<div class="status"></div>
<div class="task">{{task}}</div>
<div class="delete">x</div>
`;

document.addEventListener("DOMContentLoaded", function () {
  getTasks();
});

addTaskButton.addEventListener("click", function () {
  if (!taskInput.value) return;
  taskInput.value = taskInput.value.trim();
  addTask(taskInput.value);
});

taskContainer.addEventListener("click", event => {
  const task = event.target.parentElement;
  const taskId = task.getAttribute("data-id");

  if (event.target.classList.contains("delete")) {
    deleteTask(taskId);
  }

  if (event.target.classList.contains("task")) {
    const currentStatus = task.classList.contains("completed");
    updateTask(taskId, currentStatus);
  }
});

function getTasks() {
  fetch(apiString, {
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      if (!data.resultStatus.success) {
        return;
      }

      data.result.tasks.forEach(task => {
        const newTask = document.createElement("li");
        newTask.setAttribute("data-id", task.id);
        newTask.classList.add("task-item");

        if (task.completed) {
          newTask.classList.add("completed");
        }

        newTask.innerHTML = taskTemplate.replace("{{task}}", task.description);
        taskContainer.appendChild(newTask);
      });
    })
    .then(() => {
      updateTaskCount();
    });
}

function addTask(task) {
  fetch(apiString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey
    },
    body: JSON.stringify({ description: task })
  })
    .then(response => response.json())
    .then(data => {
      if (!data.resultStatus.success) {
        return;
      }

      const newTask = document.createElement("li");
      newTask.setAttribute("data-id", data.result.id);
      newTask.classList.add("task-item");
      newTask.innerHTML = taskTemplate.replace("{{task}}", data.result.description);
      taskContainer.appendChild(newTask);
    })
    .then(() => {
      updateTaskCount();
    })
    .finally(() => {
      taskInput.value = "";
    });
}

function deleteTask(taskId) {
  fetch(apiString + taskId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      if (!data.resultStatus.success) {
        return;
      }

      document.querySelector(`[data-id="${taskId}"]`).remove();
    })
    .then(() => {
      updateTaskCount();
    });
}

function updateTask(taskId, currentStatus) {
  fetch(apiString + taskId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey
    },
    body: JSON.stringify({ completed: !currentStatus, description: "" })
  })
    .then(response => response.json())
    .then(data => {
      if (!data.resultStatus.success) {
        return;
      }

      const taskElement = document.querySelector(`[data-id="${taskId}"]`);
      taskElement.classList.toggle("completed");
    })
    .then(() => {
      updateTaskCount();
    });
}

function updateTaskCount() {
  const taskCount = document.querySelectorAll(".task-item").length;
  taskCountSpan.innerText = taskCount;
  const taskCompletedCount = document.querySelectorAll(".task-item.completed").length;
  taskcompletedCountSpan.innerText = taskCompletedCount;
}
