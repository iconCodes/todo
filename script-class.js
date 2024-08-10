class TaskManager {
  constructor(inputSelector, addButtonSelector, taskContainerSelector) {
    this.input = document.querySelector(inputSelector);
    this.addButton = document.querySelector(addButtonSelector);
    this.taskContainer = document.querySelector(taskContainerSelector);
    this.taskTemplate = `
        <div class="status"></div>
        <div class="task">{{task}}</div>
        <div class="delete">x</div>
      `;

    this.addButton.addEventListener("click", () => this.addTask());
    this.taskContainer.addEventListener("click", e =>
      this.handleTaskActions(e)
    );
  }

  addTask() {
    if (!this.input.value) {
      return;
    }
    const newTask = document.createElement("div");
    newTask.classList.add("task-item");
    newTask.innerHTML = this.taskTemplate.replace("{{task}}", this.input.value);
    this.taskContainer.appendChild(newTask);
    this.input.value = "";
  }

  handleTaskActions(e) {
    if (e.target.classList.contains("task")) {
      e.target.parentElement.classList.toggle("completed");
    }
    if (e.target.classList.contains("delete")) {
      e.target.parentElement.remove();
    }
  }
}

// Usage:
const taskManager = new TaskManager(
  "#task-input",
  "#add-task",
  "#task-container"
);
