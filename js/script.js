//Select the elements
const input = document.querySelector("#task-input"); //Input field for new tasks
const addButton = document.querySelector("#add-task"); //Button to add new tasks
const taskContainer = document.querySelector("#task-container"); //Container for tasks
const taskCountSpan = document.querySelector("#task-count"); //Span to display the number of tasks
const taskcompletedCountSpan = document.querySelector("#task-completed-count"); //Span to display the number of completed tasks

const body = document.querySelector("body"); //Body element
const themeButton = document.querySelector("#theme-button"); //Button to toggle the theme
themeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});

// Template for task items
const taskTemplate = `
<div class="status"></div>
<div class="task">{{task}}</div>
<div class="delete">x</div>
`;
// 3) Use document.querySelector to select the span and update the number of tasks.
//Function to update the number of completed tasks
const updateTaskCount = () => {
  const taskCount = document.querySelectorAll(".task-item").length;
  taskCountSpan.innerText = taskCount;
};

//Function to update the number of completed tasks
const updateTaskCompletedCount = () => {
  const taskCount = document.querySelectorAll(".task-item.completed").length;
  console.log(20, taskCount);
  taskcompletedCountSpan.innerText = taskCount; //Update the task count span
};

addButton.addEventListener("click", () => {
  if (!input.value) return;

  const newTask = document.createElement("li");
  newTask.classList.add("task-item");
  newTask.innerHTML = taskTemplate.replace("{{task}}", input.value);
  taskContainer.appendChild(newTask);
  input.value = "";

  updateTaskCount();
});

taskContainer.addEventListener("click", event => {
  if (event.target.classList.contains("task")) {
    event.target.parentElement.classList.toggle("completed");
    updateTaskCompletedCount();
  }
  //4) Use document.querySelectAll and the length property to update the number of tasks when a task is added deleted
  //
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    updateTaskCount();
    updateTaskCompletedCount();
  }
});
//Intitialize the task count
updateTaskCount();
