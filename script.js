const input = document.querySelector("#task-input");
const addButtons = document.querySelector("#add-task");
const taskContainer = document.querySelector("#task-container");

const taskTemplate = `
    <div class="status"></div>
    <div class="task">{{task}}</div>
    <div class="delete">x</div>
`;

addButtons.addEventListener("click", function () {
  if (!input.value) {
    return;
  }
  const newTask = document.createElement("div");
  newTask.classList.add("task-item");
  newTask.innerHTML = taskTemplate.replace("{{task}}", input.value);
  taskContainer.appendChild(newTask);
  input.value = "";
});

taskContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("task")) {
    e.target.parentElement.classList.toggle("completed");
  }
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});
