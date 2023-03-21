const todoInput = document.querySelector("#add-tast-bar");
const todoList = document.querySelector("#task-list");
const deleteButtons = document.querySelectorAll("#delete-button");
const checkButtons = document.querySelectorAll(
  "#task-list button.check-button"
);

const history = localStorage.getItem("tasks");
const filteredHistory = JSON.parse(history).filter((task) => task.done === 1);

let oldInputValue;

const removeFromLocalStorage = (taskField) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskId = taskField.getAttribute("data-task-id");
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const updateLocalStorageDone = (taskField) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskId = taskField.getAttribute("data-task-id");
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex > -1) {
    tasks[taskIndex].done = taskField.classList.contains("checked") ? 1 : 0;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

const createCheckButton = () => {
  const checkButton = document.createElement("button");
  checkButton.classList.add("check-button");
  checkButton.innerHTML = ' <i class="feather" data-feather="check"></i>';
  return checkButton;
};

const createInputItem = (value) => {
  const inputItem = document.createElement("input");
  inputItem.setAttribute("disabled", "");
  inputItem.value = value;
  return inputItem;
};

const createDeleteButton = () => {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("task-button");
  deleteButton.setAttribute("id", "delete-button");
  deleteButton.setAttribute("title", "Excluir");
  deleteButton.innerHTML = '<i class="feather" data-feather="trash-2"></i>';

  deleteButton.addEventListener("click", () =>
    deleteButtonListener(deleteButton)
  );

  return deleteButton;
};

const addCheckButtonEventListener = (button) => {
  button.addEventListener("click", () => {
    const taskField = button.closest(".task-field");
    const inputItem = document.createElement("input");
    taskField.classList.toggle("checked");
    inputItem.setAttribute("disabled", "");
    const input = taskField.querySelector("input");
    input.disabled = input.disabled;
    window.location.reload();
    updateLocalStorageDone(taskField);
  });
};

const deleteButtonListener = (button) => {
  const taskField = button.parentNode.parentNode;
  if (taskField !== null) {
    removeFromLocalStorage(taskField);
    taskField.remove();
    window.location.reload();
  }
};

const saveTodo = () => {
  if (todoInput.value.trim() === "") {
    return;
  }

  const taskObject = {
    id: generateUUID(),
    title: todoInput.value,
    done: 0,
  };

  const todo = document.createElement("fieldset");
  todo.classList.add("task-field");

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  const newCheckButton = createCheckButton();
  taskItem.appendChild(newCheckButton);
  addCheckButtonEventListener(newCheckButton);
  const inputItem = createInputItem(taskObject.title);
  inputItem.setAttribute("disabled", true);
  taskItem.appendChild(inputItem);

  const taskButtonDiv = document.createElement("div");
  taskButtonDiv.classList.add("task-buttons");


  const newDeleteButton = createDeleteButton();
  taskButtonDiv.appendChild(newDeleteButton);
  deleteButtonListener(newDeleteButton);

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskObject);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  todo.appendChild(taskItem);
  todo.appendChild(taskButtonDiv);

  todo.setAttribute("data-task-id", taskObject.id); // Add this line

  todoList.appendChild(todo);
  todoInput.value = "";
  feather.replace();
};

function changeTheme() {
  const body = document.body;
  const themeButton = document.querySelector("#sun");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    themeButton.setAttribute("data-feather", "sun");
  } else {
    body.classList.add("dark");
    themeButton.setAttribute("data-feather", "moon");
  }

  feather.replace();
}

if (history !== null && Object.values(history).length > 0) {
  const tasks = filteredHistory;

  tasks.forEach((task) => {
    const todo = document.createElement("fieldset");
    todo.setAttribute("data-task-id", task.id);
    todo.classList.add("task-field");

    if (task.done === 1) {
      todo.classList.toggle("checked");
    }

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const newCheckButton = createCheckButton();
    taskItem.appendChild(newCheckButton);
    addCheckButtonEventListener(newCheckButton);

    const inputItem = createInputItem(task.title);
    inputItem.setAttribute("disabled", true);
    taskItem.appendChild(inputItem);

    const taskButtonDiv = document.createElement("div");
    taskButtonDiv.classList.add("task-buttons");

    const newDeleteButton = createDeleteButton();
    taskButtonDiv.appendChild(newDeleteButton);
    deleteButtonListener(newDeleteButton);

    todo.appendChild(taskItem);
    todo.appendChild(taskButtonDiv);

    todoList.appendChild(todo);
    feather.replace();
  });
}

function generateUUID() {
  let d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); // use high-precision timer if available
  }
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
