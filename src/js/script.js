const todoInput = document.querySelector("#add-tast-bar");
const todoList = document.querySelector("#task-list");
const editButtons = document.querySelectorAll("#edit-button");
const deleteButtons = document.querySelectorAll("#delete-button");
const checkButtons = document.querySelectorAll(
  "#task-list button.check-button"
);

const history = localStorage.getItem('tasks');

let oldInputValue;

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

const createEditButton = () => {
  const editButton = document.createElement("button");
  editButton.classList.add("task-button");
  editButton.setAttribute("id", "edit-button");
  editButton.setAttribute("title", "Editar");
  editButton.innerHTML = '<i class="feather" data-feather="edit-2"></i>';

  editButton.addEventListener("click", () => editButtonListener(editButton));

  return editButton;
};

const editButtonListener = (button) => {
  const taskField = button.closest(".task-field"); // Adicionado
  const input = taskField.querySelector("input"); // Adicionado

  input.removeAttribute("disabled");

  button.innerHTML = '<i class="feather" data-feather="save"></i>';
  button.setAttribute("id", "save-button");
  feather.replace();

  button.addEventListener("click", () => {
    const newValue = input.value;

    input.setAttribute("disabled", true);
    input.classList.remove("editable");

    button.innerHTML = '<i class="feather" data-feather="edit-2"></i>';
    button.setAttribute("id", "edit-button");

    input.value = newValue;
    feather.replace();
  });
};

const createDeleteButton = () => {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("task-button");
  deleteButton.setAttribute("id", "delete-button");
  deleteButton.setAttribute("title", "Excluir");
  deleteButton.innerHTML = '<i class="feather" data-feather="trash-2"></i>';

  deleteButton.addEventListener("click", () => deleteButtonListener(deleteButton));

  return deleteButton;
};

// checkButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const taskField = button.closest(".task-field");
//     taskField.classList.toggle("checked");
//     inputItem.setAttribute("disabled", "");
//     const input = taskField.querySelector("input");
//     input.disabled = input.disabled;
//   });
// });

const addCheckButtonEventListener = (button) => {
  button.addEventListener("click", () => {
    const taskField = button.closest(".task-field");
    taskField.classList.toggle("checked");
    inputItem.setAttribute("disabled", "");
    const input = taskField.querySelector("input");
    input.disabled = input.disabled;
  });
};

const deleteButtonListener = (button) => {
  const taskField = button.parentNode.parentNode;
  if (taskField !== null) {
    taskField.remove();
  }
};

const saveTodo = () => {
  if (todoInput.value.trim() === "") {
    return;
  }

  const todo = document.createElement("fieldset");
  todo.classList.add("task-field");

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  const newCheckButton = createCheckButton();
  taskItem.appendChild(newCheckButton);
  addCheckButtonEventListener(newCheckButton);
  const inputItem = createInputItem(todoInput.value);
  inputItem.setAttribute("disabled", true);
  taskItem.appendChild(inputItem);

  const taskButtonDiv = document.createElement("div");
  taskButtonDiv.classList.add("task-buttons");

  const newEditButton = createEditButton();
  taskButtonDiv.appendChild(newEditButton);

  const newDeleteButton = createDeleteButton();
  taskButtonDiv.appendChild(newDeleteButton);
  deleteButtonListener(newDeleteButton);

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(todoInput.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  todo.appendChild(taskItem);
  todo.appendChild(taskButtonDiv);

  todoList.appendChild(todo);
  todoInput.value = "";
  feather.replace();
};

const updateLocalStorage = (oldValue, newValue) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex((task) => task === oldValue);
  tasks[taskIndex] = newValue;
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function changeTheme() {
  const body = document.body;

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}

// editButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     // encontra o campo de entrada relacionado ao botão clicado
//     const input = button.parentNode.parentNode.querySelector("input");

//     // permite que o usuário edite o campo de entrada
//     input.removeAttribute("disabled");

//     // altera o botão de editar para o botão de salvar
//     button.innerHTML = '<i class="feather" data-feather="save"></i>';
//     button.setAttribute("id", "save-button");
//     feather.replace();

//     // adiciona um ouvinte de evento de clique ao botão de salvar
//     button.addEventListener("click", () => {
//       // salva o novo valor do campo de entrada
//       const newValue = input.value;

//       // desativa a edição do campo de entrada
//       input.setAttribute("disabled", true);
//       input.classList.remove("editable");

//       // altera o botão de salvar para o botão de editar
//       button.innerHTML = '<i class="feather" data-feather="edit-2"></i>';
//       button.setAttribute("id", "edit-button");

//       // atualiza o valor do campo de entrada com o novo valor
//       input.value = newValue;
//       feather.replace();
//     });
//   });
// });

// deleteButtons.forEach((button) => {
//   button.addEventListener("click", (event) => {
//     // Obtém o elemento pai do botão (fieldset.task-field)
//     const taskField = button.parentNode.parentNode;
//     // Remove o elemento da tarefa (fieldset.task-field) do DOM
//     taskField.remove();
//   });
// });

// checkButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const taskField = button.closest(".task-field");
//     taskField.classList.toggle("checked");
//     inputItem.setAttribute("disabled", "");
//     const input = taskField.querySelector("input");
//     input.disabled = input.disabled;
//   });
// });

// checkButtons.forEach((button) => {
//   addCheckButtonEventListener(button);
// });